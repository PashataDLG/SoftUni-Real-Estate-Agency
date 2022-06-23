const express = require('express');

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const houseController = require('./controllers/houseController');

const router = express.Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/house', houseController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;