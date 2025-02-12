import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserByID, getAllUsers, deleteUserById, updateUserProfile } from '../services/user.service'


//Felhasználó
const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        console.log("Req headers:", req.headers);
        console.log("Req body:", req.body);
        
        const { name, email, address, password }: { name: string; email: string; address: string, password: string } = req.body;
        
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!address) missingFields.push('address');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Hiányzó adatok!', missingFields });
        }

        const user = await registerUser(name, email, address, password);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
    try{
        const {email, password}: {email:string, password: string} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }

        const user = await loginUser(email, password);

        return res.status(201).json(user);
    }catch (error){
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userId = req.user?.id; 
        if (!userId) {
            return res.status(400).json({ message: "Hiányzó felhasználói azonosító!" });
        }

        const user = await getUserByID(userId);
        return res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userId = req.user?.id; 
        if (!userId) {
            return res.status(400).json({ message: "Hiányzó felhasználói azonosító!" });
        }

        const { name, email, password }: { name?: string; email?: string; password?: string } = req.body;

        // Meghívjuk a service-t
        const result = await updateUserProfile(userId, email, name, password);
        
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
//Admin
const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
    try{
        const users = await getAllUsers();
        return res.status(200).json(users);
    }catch(error){
        next(error);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userIdToDelete = parseInt(req.params.id); 
        const currentUserId = req.user?.userId; // A bejelentkezett felhasználó ID-ja
        
        console.log('req.user:', req.user); // Debug log a req.user ellenőrzéséhez

        if (!currentUserId) {
            return res.status(400).json({ message: "Hiányzó felhasználói azonosító!" });
        }

        if (currentUserId === userIdToDelete) {
            return res.status(400).json({ message: "Nem törölheted a saját fiókodat!" });
        }

        // Csak admin felhasználó törölhet más felhasználót
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Nincs jogosultságod más felhasználók törlésére!" });
        }

        await deleteUserById(userIdToDelete);
        return res.status(200).json({ message: "Felhasználó sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
export {register, login, getUser, getAllUser, deleteUser, updateProfile}

