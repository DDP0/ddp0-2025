import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @description User role type
 * @example "User" | "Admin" | "Mentor"
 */
export type UserRole = "User" | "Admin" | "Mentor";

/**
 * @description Extended user object with additional properties
 */
export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  image?: string;
  NPM?: string;
  idLine?: string;
  idDiscord?: string;
  gender?: "LakiLaki" | "Perempuan";
  jalurMasuk?:
    | "SNBP"
    | "SNBT"
    | "PPKB"
    | "SimakUI"
    | "SimakKKI"
    | "TalentScouting"
    | "Prestasi";
  jurusan?: "IlmuKomputer" | "SistemInformasi" | "KKI";
  asalSekolah?: string;
  buktiMasuk?: string;
  buktiShare?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @description Auth session object
 */
export interface AuthSession {
  user: AuthenticatedUser;
}

/**
 * @description API handler type
 */
export type ApiHandler = (
  request: NextRequest,
  user: AuthenticatedUser,
  context?: Record<string, unknown>
) => Promise<NextResponse> | NextResponse;

/**
 * @description Get session from request headers using better-auth
 * @param request NextRequest object
 * @returns AuthSession or null
 */
export async function getSession(
  request: NextRequest
): Promise<AuthSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return null;
    }

    return session as AuthSession;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

/**
 * @description Create standardized error response
 */
function createErrorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message, success: false },
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "WWW-Authenticate": "Bearer",
      },
    }
  );
}

/**
 * @description Basic authentication middleware
 * Protects routes that require any authenticated user
 *
 * Usage:
 * export const GET = withAuth(async (request, user) => {
 *   return NextResponse.json({ message: `Hello ${user.name}!` });
 * });
 */
export function withAuth(handler: ApiHandler) {
  return async function (
    request: NextRequest,
    context?: Record<string, unknown>
  ): Promise<NextResponse> {
    try {
      const session = await getSession(request);

      if (!session?.user) {
        return createErrorResponse("Authentication required", 401);
      }

      return await handler(request, session.user, context);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return createErrorResponse("Authentication failed", 401);
    }
  };
}

/**
 * @description Role-based authentication middleware
 * Protects routes that require specific roles
 *
 * Usage:
 * export const GET = withRole(["Admin", "Mentor"], async (request, user) => {
 *   return NextResponse.json({ message: "Admin or Mentor only" });
 * });
 */
export function withRole(allowedRoles: UserRole[], handler: ApiHandler) {
  return async function (
    request: NextRequest,
    context?: Record<string, unknown>
  ): Promise<NextResponse> {
    try {
      const session = await getSession(request);

      if (!session?.user) {
        return createErrorResponse("Authentication required", 401);
      }

      if (!allowedRoles.includes(session.user.role)) {
        return createErrorResponse(
          `Access denied. Required roles: ${allowedRoles.join(", ")}`,
          403
        );
      }

      return await handler(request, session.user, context);
    } catch (error) {
      console.error("Role middleware error:", error);
      return createErrorResponse("Authorization failed", 403);
    }
  };
}

/**
 * @description Admin-only middleware
 * Shorthand for withRole(["Admin"], handler)
 *
 * Usage:
 * export const GET = withAdmin(async (request, user) => {
 *   return NextResponse.json({ message: "Admin only area" });
 * });
 */
export function withAdmin(handler: ApiHandler) {
  return withRole(["Admin"], handler);
}

/**
 * @description Admin or Mentor middleware
 * Shorthand for withRole(["Admin", "Mentor"], handler)
 *
 * Usage:
 * export const GET = withAdminOrMentor(async (request, user) => {
 *   return NextResponse.json({ message: "Admin or Mentor area" });
 * });
 */
export function withAdminOrMentor(handler: ApiHandler) {
  return withRole(["Admin", "Mentor"], handler);
}

/**
 * @description Custom authorization middleware
 * Allows for complex authorization logic
 *
 * Usage:
 * export const GET = withCustomAuth(
 *   (user, request) => user.role === "Admin" || user.NPM === "specific-npm",
 *   async (request, user) => {
 *     return NextResponse.json({ message: "Custom auth passed" });
 *   }
 * );
 */
export function withCustomAuth(
  authCheck: (user: AuthenticatedUser, request: NextRequest) => boolean,
  handler: ApiHandler
) {
  return async function (
    request: NextRequest,
    context?: Record<string, unknown>
  ): Promise<NextResponse> {
    try {
      const session = await getSession(request);

      if (!session?.user) {
        return createErrorResponse("Authentication required", 401);
      }

      if (!authCheck(session.user, request)) {
        return createErrorResponse("Access denied", 403);
      }

      return await handler(request, session.user, context);
    } catch (error) {
      console.error("Custom auth middleware error:", error);
      return createErrorResponse("Authorization failed", 403);
    }
  };
}

/**
 * @description Resource ownership middleware
 * Ensures user can only access their own resources
 *
 * Usage:
 * export const GET = withResourceOwnership("userId", async (request, user) => {
 *   // Only runs if user.id matches the userId parameter
 *   return NextResponse.json({ message: "Your resource" });
 * });
 */
export function withResourceOwnership(
  ownerIdParam: string,
  handler: ApiHandler
) {
  return async function (
    request: NextRequest,
    context?: Record<string, unknown>
  ): Promise<NextResponse> {
    try {
      const session = await getSession(request);

      if (!session?.user) {
        return createErrorResponse("Authentication required", 401);
      }

      // Extract the owner ID from URL parameters
      const url = new URL(request.url);
      const pathSegments = url.pathname.split("/");
      const ownerIdIndex = pathSegments.findIndex(
        (segment) => segment === ownerIdParam
      );

      if (ownerIdIndex === -1 || ownerIdIndex + 1 >= pathSegments.length) {
        return createErrorResponse("Invalid resource identifier", 400);
      }

      const resourceOwnerId = pathSegments[ownerIdIndex + 1];

      // Check if user owns the resource or is an admin
      if (
        session.user.id !== resourceOwnerId &&
        session.user.role !== "Admin"
      ) {
        return createErrorResponse(
          "Access denied - resource ownership required",
          403
        );
      }

      return await handler(request, session.user, context);
    } catch (error) {
      console.error("Resource ownership middleware error:", error);
      return createErrorResponse("Authorization failed", 403);
    }
  };
}

/**
 * @description Manual authentication check for complex scenarios
 * Returns both user and potential error response
 *
 * Usage:
 * export const POST = async (request: NextRequest) => {
 *   const { user, error } = await authenticate(request);
 *
 *   if (error) {
 *     return error;
 *   }
 *
 *   // Use user for complex logic
 *   return NextResponse.json({ success: true });
 * };
 */
export async function authenticate(request: NextRequest): Promise<{
  user: AuthenticatedUser | null;
  error: NextResponse | null;
}> {
  try {
    const session = await getSession(request);

    if (!session?.user) {
      return {
        user: null,
        error: createErrorResponse("Authentication required", 401),
      };
    }

    return {
      user: session.user,
      error: null,
    };
  } catch (error) {
    console.error("Authentication check error:", error);
    return {
      user: null,
      error: createErrorResponse("Authentication failed", 401),
    };
  }
}

/**
 * @description Utility functions for checking authentication status
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const session = await getSession(request);
  return !!session;
}

export async function hasRole(
  request: NextRequest,
  role: UserRole
): Promise<boolean> {
  const session = await getSession(request);
  return session?.user.role === role;
}

export async function hasAnyRole(
  request: NextRequest,
  roles: UserRole[]
): Promise<boolean> {
  const session = await getSession(request);
  return session ? roles.includes(session.user.role) : false;
}

/**
 * @description Middleware for optional authentication
 * Passes user if authenticated, null if not, but doesn't block access
 *
 * Usage:
 * export const GET = withOptionalAuth(async (request, user) => {
 *   if (user) {
 *     return NextResponse.json({ message: `Hello ${user.name}!` });
 *   } else {
 *     return NextResponse.json({ message: "Hello guest!" });
 *   }
 * });
 */
export function withOptionalAuth(
  handler: (
    request: NextRequest,
    user: AuthenticatedUser | null,
    context?: Record<string, unknown>
  ) => Promise<NextResponse> | NextResponse
) {
  return async function (
    request: NextRequest,
    context?: Record<string, unknown>
  ): Promise<NextResponse> {
    try {
      const session = await getSession(request);
      return await handler(request, session?.user || null, context);
    } catch (error) {
      console.error("Optional auth middleware error:", error);
      return await handler(request, null, context);
    }
  };
}

/**
 * @description Rate limiting middleware (basic implementation)
 * Can be extended with Redis or other storage for production
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function withRateLimit(
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  handler: ApiHandler
) {
  return withAuth(
    async (request: NextRequest, user: AuthenticatedUser, context?: Record<string, unknown>) => {
      const key = user.id;
      const now = Date.now();
      const userLimit = rateLimitMap.get(key);

      if (!userLimit || now - userLimit.lastReset > windowMs) {
        rateLimitMap.set(key, { count: 1, lastReset: now });
      } else {
        userLimit.count++;
        if (userLimit.count > maxRequests) {
          return createErrorResponse(
            `Rate limit exceeded. Try again in ${Math.ceil(
              (windowMs - (now - userLimit.lastReset)) / 1000
            )} seconds`,
            429
          );
        }
      }

      return await handler(request, user, context);
    }
  );
}
