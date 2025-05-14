const express = require('express');
const router = express.Router();
const { signup, checkAlreadyLoggedIn, login } = require('../controllers/auth.controller');


router.post('/signup', signup);
router.get('/check-user', checkAlreadyLoggedIn);
router.post('/login',login);


module.exports = router;