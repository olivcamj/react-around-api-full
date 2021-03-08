const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

cardsRouter.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
}), getCards);

cardsRouter.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_/0-9\-#.]*)\??([a-z_/0-9\-#=&]*)/),
    likes: Joi.array().items(Joi.string()),
  }),
}), createCard);

cardsRouter.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

cardsRouter.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

module.exports = cardsRouter;
