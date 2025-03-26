import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key_here'; // Change this to a strong secret key

export const generateToken = (user: any): string => {
  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | object => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
