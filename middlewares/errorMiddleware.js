module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ message: "Validation Error", errors });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: "Duplicate field value entered" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
};
