"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("./productController"));
const route = (0, express_1.Router)();
route.route('/').post(productController_1.default.createProducts);
route.route('/').get(productController_1.default.getProducts);
route.route('/:id').put(productController_1.default.updateProducts);
route.route('/:id').delete(productController_1.default.deleteProducts);
exports.default = route;
//# sourceMappingURL=route.js.map