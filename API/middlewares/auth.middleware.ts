import jwt from "jsonwebtoken";
import { appConfig } from "../config/config";
import { Request, Response, NextFunction } from "express";

// Külön típus, hogy jobban le tudd kezelni a kódot
interface DecodedToken {
    id: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Token kinyerése az Authorization headerből
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Hozzáférés megtagadva! Hiányzó token!",
        });
    }

    try {
        // Dekódolás, és típus definíció
        const decoded = jwt.verify(token, appConfig.jwtSecret) as DecodedToken;

        // Felhasználói adatok hozzáadása a kéréshez
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Érvénytelen vagy lejárt token!",
        });
    }
};
