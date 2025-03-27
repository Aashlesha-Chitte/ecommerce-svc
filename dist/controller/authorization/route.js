"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorizationController_1 = __importDefault(require("./authorizationController"));
const route = (0, express_1.Router)();
route.route('/signup').post(authorizationController_1.default.signup);
route.route('/login').post(authorizationController_1.default.login);
route.route('/user/:id').get(
// authMiddleware,
authorizationController_1.default.getUser);
exports.default = route;
//# sourceMappingURL=route.js.map