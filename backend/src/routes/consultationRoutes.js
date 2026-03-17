import { Router } from 'express';
import { create, list } from '../controllers/consultationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', list);
router.post('/', optionalAuth, create);

export default router;
