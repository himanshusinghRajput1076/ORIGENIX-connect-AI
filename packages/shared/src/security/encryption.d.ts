/**
 * Encrypts a plaintext string (e.g. API credentials, secret tokens) using AES-256-GCM.
 * Returns payload in format: `iv:authTag:encryptedData`
 */
export declare function encryptSecret(text: string): string;
/**
 * Decrypts an AES-256-GCM encrypted payload.
 */
export declare function decryptSecret(encryptedPayload: string): string;
/**
 * Generates a cryptographically secure random API key with a prefix.
 */
export declare function generateApiKey(prefix?: string): {
    key: string;
    hash: string;
};
/**
 * Sanitizes input strings to prevent XSS / script injection.
 */
export declare function sanitizeString(str: string): string;
