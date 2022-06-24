const router = require('express').Router();

const houseService = require('../services/houseService');

router.get('/', async function (req, res) {
    let houses = await houseService.getAll().lean();

    if(houses.length > 3){
        houses = houses.slice(-3);
    }

    res.render('home', { houses })
});

router.get('/search', async function (req, res) {   
    res.render('search') 
});

router.post('/search', async function (req, res) {   
    const { searchInput } = req.body;
    const foundHouses = await houseService.searchForHouse(searchInput).lean();

    res.render('search', { foundHouses, searchInput });
});

module.exports = router;