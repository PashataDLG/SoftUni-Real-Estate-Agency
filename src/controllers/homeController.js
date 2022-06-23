const router = require('express').Router();

const houseService = require('../services/houseService');

router.get('/', async function (req, res) {
    let houses = await houseService.getAll().lean();
    
    if(houses.length > 3){
        houses = houses.slice(-3);
    }

    res.render('home', { houses })
});

module.exports = router;