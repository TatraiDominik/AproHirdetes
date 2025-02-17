import express from 'express';

import { addAdvertisement, deleteAdvertisement, updateAdvertisement, getAdvertisementById, getAllAdvertisements } from '../controllers/advertisement.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post("/addAd", authMiddleware, addAdvertisement);

router.delete("/:id", authMiddleware, deleteAdvertisement);

router.patch("/:id", authMiddleware, updateAdvertisement);

router.get("/:id", authMiddleware, getAdvertisementById);

router.get('/', authMiddleware, getAllAdvertisements);

export default router;