import jwt from 'jsonwebtoken';
import { appConfig } from '../config/config';  


interface Payload {
  userId: string;
  email: string;
  [key: string]: any; 
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, appConfig.jwtSecret, { expiresIn: '1h' });
};
