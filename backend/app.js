const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger.js');
const userRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middleware/auth.js');
const NotFoundError = require('./errors/not-found-err.js');

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // a maximum of 100 requests from one IP
});

// applying the rate-limiter
app.use(limiter);

// connect to MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use(express.json());// to support JSON-encoded bodies

app.use(requestLogger); // enabling the request logger

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  createUser,
);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.use(() => {
  throw new NotFoundError('Page not found');
});

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
