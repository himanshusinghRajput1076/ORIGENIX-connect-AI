import crypto from "crypto";

// Default fallback key for development only; MUST be set via ENCRYPTION_SECRET in production
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "origenix_secret_key_32_bytes_len_secure!";
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts a plaintext string (e.g. API credentials, secret tokens) using AES-256-GCM.
 * Returns payload in format: `iv:authTag:encryptedData`
 */
export function encryptSecret(text: string): string {
  if (!text) return "";
  
  const key = crypto.scryptSync(ENCRYPTION_SECRET, "salt_origenix_connect_ai", 32);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted payload.
 */
export function decryptSecret(encryptedPayload: string): string {
  if (!encryptedPayload) return "";
  
  const parts = encryptedPayload.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted payload format");
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = crypto.scryptSync(ENCRYPTION_SECRET, "salt_origenix_connect_ai", 32);
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Generates a cryptographically secure random API key with a prefix.
 */
export function generateApiKey(prefix = "orig_live"): { key: string; hash: string } {
  const randomBytes = crypto.randomBytes(24).toString("hex");
  const key = `${prefix}_${randomBytes}`;
  const hash = crypto.createHash("sha256").update(key).digest("hex");
  return { key, hash };
}

/**
 * Sanitizes input strings to prevent XSS / script injection.
 */
export function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
