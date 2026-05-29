function appointmentLoggerMiddleware(req, res, next) {
    console.log("Appointment route middleware executed");

    next();
}

module.exports = appointmentLoggerMiddleware;