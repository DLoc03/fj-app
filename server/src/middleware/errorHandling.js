export const errorHandler = (err, req, res, next) => {
  if (!process.env.NODE_ENV === "development") {
    console.error(`Error:${err.message}`);
    console.error(`Stack:${err.stack}`);
  } else {
    console.error(`Error:${err.message}`);
  }
  res.status(err.stack || 500).json({
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
