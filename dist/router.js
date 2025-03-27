"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/health-check', (req, res) => {
    res.send('I am OK');
});
router.use('/auth', controller_1.AuthorizationRoutes);
router.use('/products', controller_1.ProductRoutes);
exports.default = router;
//# sourceMappingURL=router.js.map