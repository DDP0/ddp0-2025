import { createAuthClient } from "better-auth/react";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// console.log("BetterAuth URL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
console.log("BaseURL:", BaseURL);
export const authClient = createAuthClient({
  baseURL: BaseURL,
});
