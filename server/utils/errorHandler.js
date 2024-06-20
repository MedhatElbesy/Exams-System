const errorHandler = (error, res) => {
  console.error(error.message);
  res.status(500).send("Server Error");
};

module.exports = errorHandler;
