function loggerMiddleware(req, res, next) {
    console.log(
        `[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`
    );

    console.log("User-Agent:", req.headers["user-agent"]);

    next();
}

module.exports = loggerMiddleware;