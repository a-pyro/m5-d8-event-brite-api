import { Router } from 'express';
import {
  addAttendeeHandler,
  dowloadTicketHandler,
} from '../controllers/attendees.js';

const router = Router();

router.route('/').post(addAttendeeHandler);

router.route('/:id/tickets').get(dowloadTicketHandler);
export default router;
