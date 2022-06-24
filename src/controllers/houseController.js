const router = require('express').Router();

const { isAuth } = require('../middleware/authMiddleware');
const { preloadPublication, isPublicationAuthor } = require('../middleware/houseMiddleware');
const houseService = require('../services/houseService');

router.get('/create', isAuth, function (req, res) {
    res.render('house/create');
});

router.post('/create', isAuth, async function (req, res) {
    let houseData = req.body;

    houseData.owner = req.user._id;

    try {
        await houseService.create(houseData);
        res.redirect('/');
    } catch (err) {
        res.status(401).render('house/create', { error: err.message });
    }
});

router.get('/for-rent', async function (req, res) {
    const availableHouses = await houseService.getAll().lean();

    res.render('house/for-rent', { availableHouses });
});

router.get('/:houseId/details', async function (req, res) {
    const house = await houseService.getByIdDetailed(req.params.houseId).lean();

    const isOwner = house.owner == req.user?._id;

    let isRented = false;

    let currentTenants = house.rentedHome.map(tenant => tenant.fullName).join(', ');

    house.rentedHome.forEach(user => {
        if(req.user?._id == user._id) {
            isRented = true;
        }
    });

    res.render('house/details', { house, isOwner, isRented, currentTenants });
});

router.get('/:houseId/edit',
    isAuth,
    preloadPublication,
    isPublicationAuthor,
    async function (req, res) {
        res.render('house/edit', { ...req.publication });
    }
);

router.post('/:houseId/edit', async function (req, res) {
    let houseData = req.body;

    houseData.owner = req.user._id;

    try {
        await houseService.updateHouse(req.params.houseId, houseData);

        res.redirect(`/house/${req.params.houseId}/details`);
    } catch (err) {
        res.status(401).render('house/edit', { ...houseData, error: err.message });
    }

});

router.get('/:houseId/rent', async function (req, res) {
    let house = await houseService.getById(req.params.houseId);

    house.rentedHome.push(req.user._id);
    house.pieces -= 1;

    console.log(house);

    await house.save();

    res.redirect(`/house/${req.params.houseId}/details`);
});

router.get('/:houseId/delete', async function (req, res) {
    await houseService.deleteHouse(req.params.houseId);

    res.redirect('/house/for-rent');
});

module.exports = router;