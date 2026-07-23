import { Request, Response, NextFunction } from 'express';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import bcrypt from 'bcrypt';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-change-in-prod');

export interface AuthPayload extends JWTPayload {
    userId: string;
    role: string;
}

export async function signToken(payload: AuthPayload, expiresIn: string = '24h'): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload> {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthPayload;
}

export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function extractBearerToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    return null;
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
    const token = extractBearerToken(req);
    if (!token) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    verifyToken(token).then(payload => {
        (req as any).user = payload;
        next();
    }).catch(() => {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    });
}

export function requireRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user as AuthPayload | undefined;
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!allowedRoles.includes(user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return;
        }
        next();
    };
}
