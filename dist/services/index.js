"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationService = exports.productService = void 0;
const ProductService_1 = __importDefault(require("./product/ProductService"));
exports.productService = ProductService_1.default;
const AuthorizationService_1 = __importDefault(require("./authorizationService/AuthorizationService"));
exports.authorizationService = AuthorizationService_1.default;
//# sourceMappingURL=index.js.map