import { dataSource } from "../config/database";  
import { User, Role } from "../models/user.model"; 
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";  

const userRepository = dataSource.getRepository(User);

//Felhasználó
const registerUser = async (name: string, email: string, address:string, password: string): Promise<Omit<User, 'password'>> => {
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            address,
            password: hashedPassword,  
            role: Role.user,  
        });

        
        return await userRepository.save(newUser);
    } catch (error) {
        console.error('User registration failed:', error);
        throw new Error('User registration failed.');
    }
};
const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'name', 'email', 'address', 'role', 'password'] 
    });

    if (!user) throw new Error("Nem regisztrált felhasználó!");
    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    
    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token }; 
};


const updateUserProfile = async (
    userId: string,
    email: string | undefined,
    name: string | undefined,
    password: string | undefined
) => {
    

    const user = await userRepository.findOne({
        where: { id: userId },
    });

    if (!user) throw new Error("Felhasználó nem található!");
   
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }
    
    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.save(user);

    return { message: "Felhasználó adatai sikeresen frissítve!" };
};
//Admin
const getUserByID = async (userId: string) => {
    const user = await userRepository
        .findOne({
            where:{id: userId},
            select:['id', 'name', 'email', 'address']
        })
        
        
    if (!user) throw new Error("Felhasználó nem található!");
    return user;
}

const getAllUsers = async () => { 
    return await userRepository.find({
        select: ['id', 'name', 'email', 'role']
    })
}

const deleteUserById = async (userId) => {
    const user = await userRepository
        .findOne({
            where: {id: userId},
        });
    if(!user) throw new Error("Felhasználó nem található!");
    return await userRepository.delete(userId);
}


export {registerUser, loginUser, getUserByID, getAllUsers, deleteUserById, updateUserProfile}