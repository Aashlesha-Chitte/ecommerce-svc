import { NextFunction } from 'express';
import { verifyToken } from '../utils/utlis';

export const authMiddleware = (req: any, res: any, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.send({ message: 'Unauthorized', status: 401 });
  } else {
    try {
      const decodedToken = verifyToken(token);
      req.userData = decodedToken;
      next();
    } catch (error) {
      return res.send({ message: 'Invalid token', status: 401 });
    }
  }
};
