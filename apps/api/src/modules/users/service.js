"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.UserRepository();
class UserService {
    async register(data) {
        const existing = await repo.findByEmail(data.email);
        if (existing)
            throw new Error('Email already in use');
        return repo.create(data);
    }
    async login(data) {
        const user = await repo.findByEmail(data.email);
        if (!user || user.passwordHash !== data.password)
            throw new Error('Invalid credentials');
        return user;
    }
    async getProfile(id) {
        const user = await repo.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    }
    async updateProfile(id, data) {
        return repo.update(id, data);
    }
}
exports.UserService = UserService;
