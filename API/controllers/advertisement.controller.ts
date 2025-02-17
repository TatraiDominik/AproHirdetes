import { Request, Response, NextFunction } from "express";
import { 
    addNewAdvertisement, 
    updateAd, 
    deleteAd, 
    getAllAd, 
    getAdById 
} from "../services/advertisement.service";


const addAdvertisement = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { userId, date, category, title, description, price, image }: 
        { userId: string; date: Date; category: string; title: string; description: string; price: number; image: string } = req.body;

        
        const missingFields = [];
        if (!userId) missingFields.push("userId");
        if (!date) missingFields.push("date");
        if (!category) missingFields.push("category");
        if (!title) missingFields.push("title");
        if (!description) missingFields.push("description");
        if (!price) missingFields.push("price");
        if (!image) missingFields.push("image");

        if (missingFields.length > 0) {
            return res.status(400).json({ message: "Hiányzó adatok!", missingFields });
        }

        const advertisement = await addNewAdvertisement(userId, date, category, title, description, price, image);
        return res.status(201).json(advertisement);
    } catch (error) {
        next(error);
    }
};


const updateAdvertisement = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const adId = req.params.id;
        const { date, category, title, description, price, image } = req.body;

        const updatedAd = await updateAd(adId, date, category, title, description, price, image);
        return res.status(200).json(updatedAd);
    } catch (error) {
        next(error);
    }
};


const deleteAdvertisement = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const adId = req.params.id;
        await deleteAd(adId);  
        return res.status(200).json({ message: "Hirdetés sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};



const getAllAdvertisements = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const advertisements = await getAllAd();
        return res.status(200).json(advertisements);
    } catch (error) {
        next(error);
    }
};


const getAdvertisementById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const adId = req.params.id;
        const advertisement = await getAdById(adId);
        return res.status(200).json(advertisement);
    } catch (error) {
        next(error);
    }
};


export { 
    addAdvertisement, 
    updateAdvertisement, 
    deleteAdvertisement, 
    getAllAdvertisements, 
    getAdvertisementById 
};
