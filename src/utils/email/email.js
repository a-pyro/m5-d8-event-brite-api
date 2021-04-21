import sgMail from '@sendgrid/mail';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { throws } from 'assert';
const { readFile } = fs;

export const sendEmail = async (toEmail, fileName) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const pathToAttachment = join(
      dirname(fileURLToPath(import.meta.url)),
      `../../data/pdf/${fileName}`
    );
    const attachment = await readFile(pathToAttachment);
    const convertedAttach = attachment.toString('base64');
    console.log(pathToAttachment);
    const msg = {
      to: toEmail,
      from: 'a.germenji@outlook.com',
      subject: 'Booking Confirmation',
      text: 'Congrats, you successfully booked this event, heres your ticket',
      attachments: [
        {
          content: convertedAttach,
          filename: 'booking.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };
    await sgMail.send(msg);
    console.log('email sent');
  } catch (error) {
    console.log('error in send email', error);
    throw new Error('Send email error');
  }
};
