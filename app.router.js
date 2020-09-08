const express = require('express');
const pageController = require('./controllers/pages');
const { createStore, upload, resize } = require('./controllers/stores');
const { registerUser } = require('./controllers/users');
const { isLoggedIn, loginUser } = require('./controllers/authentification');
const router = express.Router();

router.get('/', pageController.index);
router.get('/about', pageController.about);
router.get('/addStore', isLoggedIn, pageController.addStore);
router.post('/addStore', upload,resize, createStore);
router.get('/register', pageController.register);
router.post('/registerUser', registerUser);
router.get('/login', pageController.login);
router.post('/login', loginUser);

router.get('/stores/:slug', pageController.shopDetails);

module.exports = router