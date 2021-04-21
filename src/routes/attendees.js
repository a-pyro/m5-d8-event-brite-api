import { Router } from 'express';
import {
  addAttendeeHandler,
  createPdfHandler,
} from '../controllers/attendees.js';

const router = Router();

router.route('/').post(addAttendeeHandler);

// router.route('/:id/upload').post(upload, uploadProductPic);
router.route('/:id/createPDF').post(createPdfHandler);

export default router;
