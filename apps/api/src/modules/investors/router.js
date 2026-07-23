"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
const controller = new controller_1.InvestorController();
router.get('/', controller.getInvestors);
router.get('/:id', controller.getInvestorById);
exports.default = router;
