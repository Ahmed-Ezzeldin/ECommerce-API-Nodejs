const ApiError = require("../utils/apiError");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    success: false,
    message: err.message,
  });

const handleJwtInvalidSignature = () =>
  new ApiError("Invalid token, please login again.", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {
      // err = handleJwtInvalidSignature();
      err = new ApiError("Invalid token, please login again.", 401);
    } else if (err.name === "TokenExpiredError") {
      err = new ApiError("Expired token, please login again.", 401);
    }
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
