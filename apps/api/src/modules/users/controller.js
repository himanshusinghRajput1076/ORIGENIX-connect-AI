"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("./service");
const schemas = __importStar(require("./schemas"));
const service = new service_1.UserService();
class UserController {
    async register(req, res) {
        try {
            const parsed = schemas.UserRegisterSchema.parse(req.body);
            const result = await service.register(parsed);
            res.status(201).json({ success: true, data: result });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e.message });
        }
    }
    async login(req, res) {
        try {
            const parsed = schemas.UserLoginSchema.parse(req.body);
            const result = await service.login(parsed);
            res.status(200).json({ success: true, data: result });
        }
        catch (e) {
            res.status(401).json({ success: false, error: e.message });
        }
    }
    async getProfile(req, res) {
        try {
            const result = await service.getProfile(req.params.id);
            res.status(200).json({ success: true, data: result });
        }
        catch (e) {
            res.status(404).json({ success: false, error: e.message });
        }
    }
    async updateProfile(req, res) {
        try {
            const parsed = schemas.UserUpdateSchema.parse(req.body);
            const result = await service.updateProfile(req.params.id, parsed);
            res.status(200).json({ success: true, data: result });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e.message });
        }
    }
}
exports.UserController = UserController;
