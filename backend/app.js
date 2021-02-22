const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middleware/auth.js');

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

// connect to MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//  Implementing a temporary authorization solution
app.use((req, res, next) => {
  req.user = {
    _id: '601dd76ea2134705bb978b5a',
  };

  next();
});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found.' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
