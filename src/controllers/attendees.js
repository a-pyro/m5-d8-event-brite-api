import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errorResponse.js';
import {
  fetchProducts,
  fetchReviews,
  writeProducts,
  writeProductsPics,
} from '../utils/fsUtils.js';
import { extname } from 'path';

// @desc    add attendee
// @route   POST /attendees

export const addAttendeeHandler = async (req, res, next) => {
  try {
    res.send({ mess: 'hi' });
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
