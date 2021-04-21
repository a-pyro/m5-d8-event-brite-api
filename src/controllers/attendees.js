import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';
import { fetchAttendees, writeAttendees } from '../utils/fs/fsUtils.js';
import { sendEmail } from '../utils/email/email.js';

import generatePDF, { asyncPipeline } from '../utils/pdf/generatePDF.js';
// @desc    add attendee
// @route   POST /attendees

export const addAttendeeHandler = async (req, res, next) => {
  try {
    const attendees = await fetchAttendees();
    const newAttendee = { ...req.body, createdAt: new Date(), _id: uuidv4() };
    const userAlreadyBooked = attendees.findIndex(
      (us) => us.email === newAttendee.email
    );
    console.log(userAlreadyBooked);
    if (userAlreadyBooked !== -1) {
      console.log('user already booked!');
      res.status(400).send({
        success: false,
        message: `User already booked, please use the link below to download the ticket`,
        link: `${req.protocol}://${req.get('host')}/attendees/${
          attendees[userAlreadyBooked]._id
        }/tickets`,
      });
    } else {
      // console.log(`${newAttendee._id}.pdf`);
      attendees.push(newAttendee);

      await generatePDF(newAttendee);
      await writeAttendees(attendees);
      await sendEmail(newAttendee.email, `${newAttendee._id}.pdf`);
      res.send({ success: true, _id: newAttendee._id });
    }
  } catch (error) {
    console.log('error in addAttendee');
    next(error);
  }
};

// @desc    generate pdf and send stream to download
// @route   GET /attendees/:id/tickets
export const dowloadTicketHandler = async (req, res, next) => {
  try {
    const attendees = await fetchAttendees();
    const atteendee = attendees.find((att) => att._id === req.params.id);
    if (atteendee) {
      const sourceStream = await generatePDF(atteendee);
      res.set({
        'Content-Type': 'application/pdf',
      });
      res.attachment(req.params.id);
      await asyncPipeline(sourceStream, res);
      // res.send({ mess: 'fatto!' });
    } else {
      next(new ErrorResponse('Atteendee not found', 404));
    }
  } catch (error) {
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
