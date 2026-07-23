"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUserRole = authorizeUserRole;
exports.extractBearerToken = extractBearerToken;
/**
 * Verifies session authorization & role-based access controls safely.
 */
function authorizeUserRole(user, requiredRole) {
    if (user.role === "ADMIN")
        return true;
    if (requiredRole === "ANALYST" && user.role === "ANALYST")
        return true;
    return user.role === requiredRole;
}
/**
 * Validates bearer token header format safely.
 */
function extractBearerToken(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7).trim();
}
