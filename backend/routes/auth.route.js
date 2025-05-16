const express = require('express');
const router = express.Router();
const { signup, checkAlreadyLoggedIn, login, getEmail } = require('../controllers/auth.controller');


router.post('/signup', signup);
router.get('/check-user', checkAlreadyLoggedIn);
router.post('/login', login);
router.get('/get-email', getEmail);


module.exports = router;