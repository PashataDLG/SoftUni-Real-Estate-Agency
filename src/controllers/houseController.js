const router = require('express').Router();

const houseService = require('../services/houseService');

router.get('/create', function (req, res){
    res.render('house/create');
});

router.post('/create', async function (req, res){
    let houseData = req.body;

    houseData.owner = req.user._id;

    try {
        await houseService.create(houseData);
        res.redirect('/');
    } catch (err) {
        res.status(401).render('house/create', { error: err.message });
    }
});

module.exports = router;