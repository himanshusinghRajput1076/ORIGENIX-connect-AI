"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptSecret = encryptSecret;
exports.decryptSecret = decryptSecret;
exports.generateApiKey = generateApiKey;
exports.sanitizeString = sanitizeString;
const crypto_1 = __importDefault(require("crypto"));
// Default fallback key for development only; MUST be set via ENCRYPTION_SECRET in production
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "origenix_secret_key_32_bytes_len_secure!";
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
/**
 * Encrypts a plaintext string (e.g. API credentials, secret tokens) using AES-256-GCM.
 * Returns payload in format: `iv:authTag:encryptedData`
 */
function encryptSecret(text) {
    if (!text)
        return "";
    const key = crypto_1.default.scryptSync(ENCRYPTION_SECRET, "salt_origenix_connect_ai", 32);
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}
/**
 * Decrypts an AES-256-GCM encrypted payload.
 */
function decryptSecret(encryptedPayload) {
    if (!encryptedPayload)
        return "";
    const parts = encryptedPayload.split(":");
    if (parts.length !== 3) {
        throw new Error("Invalid encrypted payload format");
    }
    const [ivHex, authTagHex, encryptedHex] = parts;
    const key = crypto_1.default.scryptSync(ENCRYPTION_SECRET, "salt_origenix_connect_ai", 32);
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
/**
 * Generates a cryptographically secure random API key with a prefix.
 */
function generateApiKey(prefix = "orig_live") {
    const randomBytes = crypto_1.default.randomBytes(24).toString("hex");
    const key = `${prefix}_${randomBytes}`;
    const hash = crypto_1.default.createHash("sha256").update(key).digest("hex");
    return { key, hash };
}
/**
 * Sanitizes input strings to prevent XSS / script injection.
 */
function sanitizeString(str) {
    if (!str)
        return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}
