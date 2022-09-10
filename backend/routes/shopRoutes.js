import express from 'express';
const router = express.Router();
import {
  getShops,
  getShopById,
  deleteShop,
  updateShop,
  createShop,
} from '../controllers/shopController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getShops).post(protect, admin, createShop);
router
  .route('/:id')
  .get(getShopById)
  .delete(protect, admin, deleteShop)
  .put(protect, admin, updateShop);

export default router;
