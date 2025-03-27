"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../../utils/utils"); // Make sure the path is correct
class AuthorizationService {
    constructor() {
        this.users = [];
        this.userIndex = 1; // Simple incrementing ID for mock users
        // Pre-stored mock user data for demonstration
        const initialPassword = 'admin'; // This can be any plaintext password
        const hashedPassword = bcryptjs_1.default.hashSync(initialPassword, 10);
        // Adding a pre-existing user
        this.users.push({ id: this.userIndex++, username: 'admin', email: 'admin@gmail.com', password: hashedPassword });
    }
    static getInstance() {
        if (!AuthorizationService.instance) {
            AuthorizationService.instance = new AuthorizationService();
        }
        return AuthorizationService.instance;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                // Check if the user already exists
                const existingUser = this.users.find(user => user.email === email);
                if (existingUser) {
                    return res.status(409).json({ message: 'User already exists' });
                }
                // Mock password saving
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = { id: this.userIndex++, username, email, password: hashedPassword };
                this.users.push(newUser); // Store it in our mock data array
                const token = (0, utils_1.generateToken)(newUser); // Generate a token with the mock user data
                return res.send({ message: 'Success', status: 200, user: newUser, token });
            }
            catch (error) {
                return res.send({ status: 500, message: 'Error signing up', error });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = this.users.find(users => users.email === email); // Find the user in our mock data
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed' });
                }
                else {
                    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                    if (!isPasswordValid) {
                        return res.status(401).json({ message: 'Authentication failed' });
                    }
                    else {
                        const token = (0, utils_1.generateToken)(user); // Generate a token with the mock user data
                        return res.send({ message: 'Success', status: 200, user, token });
                    }
                }
            }
            catch (error) {
                return res.send({ status: 500, message: 'Error logging in', error });
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10); // Ensure we parse id as an integer
                const user = this.users.find(users => users.id === userId); // Find the user in our mock data
                if (!user) {
                    return res.status(404).send({ message: 'User not found', status: 404 });
                }
                return res.send({ message: 'Success', status: 200, data: user });
            }
            catch (error) {
                return res.send({ status: 500, message: 'Error fetching user', error });
            }
        });
    }
}
exports.default = AuthorizationService.getInstance();
//# sourceMappingURL=AuthorizationService.js.map