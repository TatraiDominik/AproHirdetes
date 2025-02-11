import { dataSource } from "../config/database";  
import { User, Role } from "../models/user.model"; 
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";  

const registerUser = async (name: string, email: string, password: string): Promise<Omit<User, 'password'>> => {
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRepository = dataSource.getRepository(User);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,  
            role: Role.user,  
        });

        await userRepository.save(newUser);

        const { password: _, ...userWithoutPassword } = newUser;
        
        return userWithoutPassword; 
    } catch (error) {
        console.error('User registration failed:', error);
        throw new Error('User registration failed.');
    }
};
const loginUser = async (email: string, password: string) => {
    const userRepository = dataSource.getRepository(User);
    
    const user = await userRepository
        .createQueryBuilder('user')  
        .where("user.email = :email", { email }) 
        .getOne();

    if (!user) throw new Error("Nem regisztrált felhasználó!");
    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');
}

export {registerUser, loginUser}