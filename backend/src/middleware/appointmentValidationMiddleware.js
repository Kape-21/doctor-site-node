function appointmentValidationMiddleware(req, res, next) {
    const {
        patientName,
        email,
        phone,
        appointmentDate
    } = req.body;

    // Required field validation

    if (!patientName) {
        return res.status(400).json({
            success: false,
            message: "Patient name is required"
        });
    }

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required"
        });
    }

    if (!appointmentDate) {
        return res.status(400).json({
            success: false,
            message: "Appointment date is required"
        });
    }

    // Patient name validation

    if (typeof patientName !== "string") {
        return res.status(400).json({
            success: false,
            message: "Patient name must be a string"
        });
    }

    if (patientName.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Patient name must be at least 3 characters"
        });
    }

    // Email validation

    if (
        typeof email !== "string" ||
        !email.includes("@") ||
        !email.includes(".")
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        });
    }

    // Phone validation

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: "Phone number must be exactly 10 digits"
        });
    }

    // Date validation

    const parsedDate = new Date(appointmentDate);

    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
            success: false,
            message: "Valid appointment date is required"
        });
    }

    next();
}

module.exports = appointmentValidationMiddleware;