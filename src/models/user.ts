import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface IUsersModel extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: true
    }
);

const User: mongoose.Model<IUsersModel> = mongoose.model<IUsersModel>('User', userSchema, 'User');

export default User;