export type RoleType = "ADMIN" | "ANALYST" | "USER";
export interface SessionUser {
    id: string;
    email: string;
    name: string;
    role: RoleType;
}
/**
 * Verifies session authorization & role-based access controls safely.
 */
export declare function authorizeUserRole(user: SessionUser, requiredRole: RoleType): boolean;
/**
 * Validates bearer token header format safely.
 */
export declare function extractBearerToken(authHeader: string | null): string | null;
