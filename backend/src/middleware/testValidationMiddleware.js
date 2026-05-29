function testValidationMiddleware(req, res, next) {
    const allowRequest = false;

    if (!allowRequest) {
        return res.status(400).json({
            success: false,
            message: "Request blocked by middleware"
        });
    }

    next();
}

module.exports = testValidationMiddleware;