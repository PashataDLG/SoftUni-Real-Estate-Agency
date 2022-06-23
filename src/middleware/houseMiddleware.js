const houseService = require('../services/houseService');

exports.preloadPublication = async (req, res, next) => {
    const publication = await houseService.getById(req.params.houseId).lean();

    req.publication = publication;

    next();
};

exports.isPublicationAuthor = async (req, res, next) => {
    if (req.publication.owner != req.user._id) {
        return res.status(401).render('404', { error: 'You are not authorized' });
    }

    next();
};