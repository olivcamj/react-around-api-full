const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();
const { PORT = 3000 } = process.env;

// connect to MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//  Implementing a temporary authorization solution
app.use((req, res, next) => {
  req.user = {
    _id: '601dd76ea2134705bb978b5a',
  };

  next();
});

app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found.' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
