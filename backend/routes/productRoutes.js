import express from "express";
import {
  createProduct,
  createProductReviews,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReviews);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProductById);

export default router;
