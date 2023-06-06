const status = (req, res) => {
  res.status(200).json({
    status: "ok",
    msg: "server is running",
  });
};
module.exports = status;
