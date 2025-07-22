import { google } from "googleapis";

// Google Sheets configuration
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
);

// Initialize Google Sheets client
const initializeGoogleSheets = () => {
    if (!GOOGLE_SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        throw new Error(
            "Missing Google Sheets configuration. Please check your environment variables."
        );
    }

    const auth = new google.auth.JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
};

// Interface definitions
export interface UserRegistrationData {
    id: string;
    name: string;
    email: string;
    NPM?: string;
    idLine?: string;
    idDiscord?: string;
    buktiMasuk?: string;
    buktiShare?: string;
    jalurMasuk?: string;
    jurusan?: string;
    gender?: string;
    asalSekolah?: string;
    createdAt: Date;
}

// Sheet names
const SHEET_NAMES = {
    USERS: "AUTOMATED REGISTER FROM WEBSITE DONT EDIT",
} as const;

/**
 * Add user registration data to Google Sheets
 */
export async function addUserToSheet(
    userData: UserRegistrationData
): Promise<void> {
    try {
        const sheets = initializeGoogleSheets();

        const values = [
            [
                userData.id,
                userData.name,
                userData.email,
                userData.NPM || "",
                userData.idLine || "",
                userData.idDiscord || "",
                userData.buktiMasuk || "",
                userData.buktiShare || "",
                userData.jalurMasuk || "",
                userData.jurusan || "",
                userData.gender || "",
                userData.asalSekolah || "",
                userData.createdAt.toISOString(),
            ],
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `${SHEET_NAMES.USERS}!A:M`,
            valueInputOption: "RAW",
            requestBody: {
                values,
            },
        });

        console.log(`User ${userData.name} added to Google Sheets successfully`);
    } catch (error) {
        console.error("Error adding user to Google Sheets:", error);
        throw error;
    }
}
