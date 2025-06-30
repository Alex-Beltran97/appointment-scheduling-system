import nodemailer from 'nodemailer';
import html from './emailTemplate';
import { config } from '../../config';
import { Appointment } from '../../models/consultants';

const {user, pass} = config.email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendMail = async (to: string, subject: string, appointment: Appointment, confirmation?: boolean) => {
  await transporter.sendMail({
    from: '"Date Fixer" <no-replay@date-fixer.com>',
    to,
    subject,
    html: html(appointment, confirmation)
  });
};
