import express from "express";
import doGetAllCatalogItems from "../services/doGetAllCatalogItems.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await doGetAllCatalogItems();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
        next(error);
    }
});

export default router;
