"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.collections = exports.db = void 0;
var database_1 = require(" @origenix/database;");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return database_1.db; } });
Object.defineProperty(exports, "collections", { enumerable: true, get: function () { return database_1.collections; } });
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return database_1.auth; } });
