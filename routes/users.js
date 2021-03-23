const express = require('express');
const utils = require('../utils/utils');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// JWT token test route
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      msg: 'You accessed protected route with JWT token successfully! ',
    });
  }
);

router.post('/login', userController.login_POST);

router.post('/register', userController.register_POST);

module.exports = router;
