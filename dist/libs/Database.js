"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static open({ mongoUri, testEnv }) {
        // Mock the mongoose for testing purpose using Mockgoose
        // connect to mongo db
        return mongoose_1.default.connect(mongoUri)
            .catch((err) => {
            console.error(`Error connecting to database: ${mongoUri} ${JSON.stringify(err)}`);
            throw new Error(`Unable to connect to database: ${mongoUri}`);
        });
    }
    static close() {
        mongoose_1.default.disconnect();
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map