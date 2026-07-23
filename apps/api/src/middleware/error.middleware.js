"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(422).json({
            success: false,
            error: "Validation Failed",
            details: err.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }
    console.error("[API Error Handler]:", err);
    const status = err.status || 500;
    const message = process.env.NODE_ENV === "production"
        ? "An unexpected error occurred."
        : err.message || "Internal Server Error";
    return res.status(status).json({
        success: false,
        error: message,
    });
}
