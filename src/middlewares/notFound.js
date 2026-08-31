const notFound = (req, res, next) => {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} wurde nicht gefunden`,
  );

  error.statusCode = 404;
  next(error);
};

export default notFound;
