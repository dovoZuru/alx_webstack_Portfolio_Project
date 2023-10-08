const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoutes');
const userRoutes = require('./app/routes/userRoutes');
const transferRoutes = require('./app/routes/transferRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transfers', transferRoutes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
