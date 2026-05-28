const getindex = (req, res) => {
  res.json({
    success: true,
    message: "Index controller is working",
  });
};

module.exports = {
  getindex,
};