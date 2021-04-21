import { Router } from 'express';
import {
  addAttendeeHandler,
  createPdfHandler,
  dowloadTicketHandler,
} from '../controllers/attendees.js';

const router = Router();

router.route('/').post(addAttendeeHandler);

// router.route('/:id/upload').post(upload, uploadProductPic);
router.route('/:id/createPDF').post(createPdfHandler);

router.route('/:id/tickets').get(dowloadTicketHandler);
export default router;
