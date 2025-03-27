"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const utils_1 = require("../utils/utils");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.send({ message: 'Unauthorized', status: 401 });
    }
    else {
        try {
            const decodedToken = (0, utils_1.verifyToken)(token);
            req.userData = decodedToken;
            next();
        }
        catch (error) {
            return res.send({ message: 'Invalid token', status: 401 });
        }
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map