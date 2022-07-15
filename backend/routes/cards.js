const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

const {
  validatyCardId,
  validatyCard,
} = require('../middlewares/validity');

router.get('/cards', getCards);

router.post('/cards', validatyCard, createCard);
router.delete('/cards/:cardId', validatyCardId, deleteCard);
router.put('/cards/likes/:cardId', validatyCardId, likeCard);
router.delete('/cards/likes/:cardId', validatyCardId, dislikeCard);

module.exports = router;
