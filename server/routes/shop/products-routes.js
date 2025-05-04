import express from "express";
import {
  getFilterProducts,
  getProductsDetails,
} from "../../controllers/shop/product-controller.js";

const router = express.Router();
router.get("/get", getFilterProducts);
router.get("/get/:id", getProductsDetails);
export default router;
