import sgMail from '@sendgrid/mail';

export const sendEmail = async (toEmail) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: toEmail,
      from: 'a.germenji@outlook.com',
      subject: 'Booking Confirmation',
      text: 'Congrats, you successfully booked this event',
    };
    await sgMail.send(msg);
    console.log('email sent');
  } catch (error) {
    next(error);
  }
};
