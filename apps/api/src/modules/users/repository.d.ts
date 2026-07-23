export declare class UserRepository {
    findByEmail(email: string): Promise<{
        role: import("@origenix/database").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    } | null>;
    create(data: any): Promise<{
        role: import("@origenix/database").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
    findById(id: string): Promise<{
        role: import("@origenix/database").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    } | null>;
    update(id: string, data: any): Promise<{
        role: import("@origenix/database").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
}
