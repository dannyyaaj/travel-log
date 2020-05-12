const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares');
const logs = require('../api/logs');

// use environment variables
require('dotenv').config();

const app = express();

// connect to mongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// /api/logs points to logs router
app.use('/api/logs', logs);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}`);
});
