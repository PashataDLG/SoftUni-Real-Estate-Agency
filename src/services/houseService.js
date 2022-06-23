const Housing = require('../models/Housing');

exports.create = (houseData) => Housing.create(houseData);