const makeError = (error, statuscode, otherFields) => {
  error.status = statuscode;
  error.otherFields = otherFields;
  return error;
};
module.exports = { makeError };
