import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/utlis';
import User from '../../models/user';

class AuthorizationService {

    public static getInstance(): AuthorizationService {
        if (!AuthorizationService.instance) {
            AuthorizationService.instance = new AuthorizationService();
        }
        return AuthorizationService.instance;
    }
    private static instance: AuthorizationService;

    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: hashedPassword });
            const token = generateToken(newUser);
            return res.send({ message: 'Success', status: 200, user: newUser, token });

        } catch (error) {
            return res.send({ status: 500, message: 'Error signing up', error: error });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: 'Authentication failed' });
            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ message: 'Authentication failed' });
                } else {
                    const token = generateToken(user);
                    return res.send({ message: 'Success', status: 200, user: user, token });
                }
            }
        } catch (error) {
            return res.send({ status: 500, message: 'Error logging in', error: error });
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            return res.send({ message: 'Success', status: 200, data: user });
        } catch (error) {
            return res.send({ status: 500, message: 'Error fetching products', error: error });
        }
    }
}

export default AuthorizationService.getInstance();
