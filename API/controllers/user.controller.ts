import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/user.service'

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { name, email, password }: { name: string; email: string; password: string } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }

        const user = await registerUser(name, email, password);

        return res.status(201).json(user);
    } catch (error) {
        next(error);  
    }
};
