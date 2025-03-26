import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/utils'; // Make sure the path is correct

class AuthorizationService {
    private static instance: AuthorizationService;

    private users: { id: number; username: string; email: string; password: string }[] = [];
    private userIndex: number = 1; // Simple incrementing ID for mock users

    private constructor() {
        // Pre-stored mock user data for demonstration
        const initialPassword = 'admin'; // This can be any plaintext password
        const hashedPassword = bcrypt.hashSync(initialPassword, 10);

        // Adding a pre-existing user
        this.users.push({ id: this.userIndex++, username: 'admin', email: 'admin@gmail.com', password: hashedPassword });
    }

    public static getInstance(): AuthorizationService {
        if (!AuthorizationService.instance) {
            AuthorizationService.instance = new AuthorizationService();
        }
        return AuthorizationService.instance;
    }

    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;

            // Check if the user already exists
            const existingUser = this.users.find(user => user.email === email);
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Mock password saving
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { id: this.userIndex++, username, email, password: hashedPassword };
            this.users.push(newUser); // Store it in our mock data array

            const token = generateToken(newUser); // Generate a token with the mock user data
            return res.send({ message: 'Success', status: 200, user: newUser, token });

        } catch (error) {
            return res.send({ status: 500, message: 'Error signing up', error });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = this.users.find(users => users.email === email); // Find the user in our mock data

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Authentication failed' });
                } else {
                    const token = generateToken(user); // Generate a token with the mock user data
                    return res.send({ message: 'Success', status: 200, user, token });
                }
            }
        } catch (error) {
            return res.send({ status: 500, message: 'Error logging in', error });
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10); // Ensure we parse id as an integer
            const user = this.users.find(users => users.id === userId); // Find the user in our mock data
            if (!user) {
                return res.status(404).send({ message: 'User not found', status: 404 });
            }
            return res.send({ message: 'Success', status: 200, data: user });
        } catch (error) {
            return res.send({ status: 500, message: 'Error fetching user', error });
        }
    }
}

export default AuthorizationService.getInstance();