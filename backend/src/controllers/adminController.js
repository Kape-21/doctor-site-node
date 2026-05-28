const getAdmin = (req, res) => {
  res.json({
    success: true,
    message: "Admin controller is working",
  });
};

module.exports = {
  getAdmin,
};