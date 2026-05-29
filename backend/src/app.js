const express = require('express');

const loggerMiddleware = require("./middleware/loggerMiddleware");
const indexRoutes = require('./routes/indexRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');



const app = express();
app.use(express.json());

app.use(loggerMiddleware);
app.use('/', indexRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;