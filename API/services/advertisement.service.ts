import { dataSource } from "../config/database";  
import { User } from "../models/user.model"; 
import { Advertisement } from "../models/advertisements.model";

const advertisementRepo = dataSource.getRepository(Advertisement);
const userRepo = dataSource.getRepository(User);

const addNewAdvertisement = async (
    userId: string,  
    date: Date, 
    category: string, 
    title: string, 
    description: string, 
    price: number, 
    image: string 
) => {
    try {
        const foundUser = await userRepo.findOne({ where: { id: userId } });
        if (!foundUser) throw new Error("Felhasználó nem található!");

        const advertisement = advertisementRepo.create({
            user: foundUser, 
            date,
            category,
            title,
            description,
            price,
            image  
        });

        return await advertisementRepo.save(advertisement);
    } catch (error) {
        console.error("Nem sikerült felvenni a hirdetést!", error);
        throw new Error("Nem sikerült felvenni a hirdetést!");
    }
};


const updateAd = async (
    adId: string, 
    date?: Date, 
    category?: string, 
    title?: string, 
    description?: string, 
    price?: number, 
    image?: string
) => {
    const advertisement = await advertisementRepo.findOne({
        where: { id: adId },  
    });

    if (!advertisement) throw new Error("Hirdetés nem található!");

    advertisement.date = date || advertisement.date;
    advertisement.category = category || advertisement.category;
    advertisement.title = title || advertisement.title;
    advertisement.description = description || advertisement.description;
    advertisement.price = price || advertisement.price;
    advertisement.image = image || advertisement.image;

    await advertisementRepo.save(advertisement);

    return { message: "A hirdetés sikeresen frissítve!", advertisement };
};


const deleteAd = async (adId: string) => {  
    const advertisement = await advertisementRepo.findOne({
        where: { id: adId },
    });

    if (!advertisement) throw new Error("Hirdetés nem található!");

    await advertisementRepo.delete(adId);
    return { message: "A hirdetés sikeresen törölve!" };
};


const getAllAd = async () =>{
    return await advertisementRepo.find();
};

const getAdById = async (adId: string) => {
    const advertisement = await advertisementRepo.findOne({
        where: { id: adId },
        relations: ["user"]
    });

    if (!advertisement) throw new Error("Hirdetés nem található!");
    return advertisement;
};


export { addNewAdvertisement, updateAd, deleteAd, getAllAd, getAdById };
