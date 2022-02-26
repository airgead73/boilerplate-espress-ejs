const errorHandler = (err, req, res, next) => {  
  const statusCode = err.status || res.statusCode || 500;
  const errorObject = {
    error: true,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  }
  //res.status(statusCode).json(errorObject);
  res.status(statusCode).render('pages/error', {
    error: errorObject
  });
}

module.exports = {
  errorHandler
}