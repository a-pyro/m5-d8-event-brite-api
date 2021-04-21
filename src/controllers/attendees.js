import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';
import { fetchAttendees, writeAttendees } from '../utils/fs/fsUtils.js';
import { sendEmail } from '../utils/email/email.js';

import generatePDF from '../utils/pdf/generatePDF.js';
// @desc    add attendee
// @route   POST /attendees

export const addAttendeeHandler = async (req, res, next) => {
  try {
    const attendees = await fetchAttendees();
    const newAttendee = { ...req.body, createdAt: new Date(), _id: uuidv4() };
    attendees.push(newAttendee);
    // console.log(`${newAttendee._id}.pdf`);
    await generatePDF(newAttendee);
    await writeAttendees(attendees);
    await sendEmail(newAttendee.email, `${newAttendee._id}.pdf`);
    res.send({ success: true, _id: newAttendee._id });
  } catch (error) {
    console.log('error in addAttendee');
    next(error);
  }
};

// @desc    generate pdf and save to disk with attendee data
// @route   POST /attendees/:id/createPDF
export const createPdfHandler = async (req, res, next) => {
  try {
    const attendees = await fetchAttendees();

    const atteendee = attendees.find((att) => att._id === req.params.id);
    if (atteendee) {
      await generatePDF(atteendee);
      res.send({ mess: 'fatto!' });
    } else {
      next(new ErrorResponse('Atteendee not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
