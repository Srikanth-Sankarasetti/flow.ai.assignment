module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statuscode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    message: "Something went wrong!",
    error: err.message, // Optionally send error details
  });
};
