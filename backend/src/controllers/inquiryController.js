const getinquiry = (req, res) => {
  res.json({
    success: true,
    message: "Inquiry controller is working",
  });
};
module.exports = {
  getinquiry,
};
