import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errorResponse.js';
import { fetchAttendees, writeAttendees } from '../utils/fsUtils.js';
import { sendEmail } from '../utils/email/email.js';
// @desc    add attendee
// @route   POST /attendees

export const addAttendeeHandler = async (req, res, next) => {
  try {
    const attendees = await fetchAttendees();
    const newAttendee = { ...req.body, createdAt: new Date(), _id: uuidv4() };
    attendees.push(newAttendee);
    await writeAttendees(attendees);
    await sendEmail(newAttendee.email);
    res.send({ success: true, _id: newAttendee._id });
  } catch (error) {
    next(error);
  }
};

// @desc    generate pdf and save to disk with attendee data
// @route   POST /attendees/:id/createPDF
export const createPdfHandler = async (req, res, next) => {
  try {
    res.send({ mess: 'hello' });
  } catch (error) {
    next(error);
  }
};
