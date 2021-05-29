/* eslint-disable import/prefer-default-export */
/**
 * Send Response
 * @param {object} res express response Object
 * @param {number} statusCode HTTP status code
 * @param {string} status Status type ('success'||''error')
 * @param {string} message info to the user
 * @param {object} data object of data for user
 */
export const ResMsg = (res, statusCode = 200, status, message, data = {}) => {
  res.status(statusCode).json({
    status,
    message,
    data,
  });
};
