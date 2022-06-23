const Housing = require('../models/Housing');

exports.create = (houseData) => Housing.create(houseData);

exports.getAll = () => Housing.find();

exports.getById = (houseId) => Housing.findOne({ _id: houseId });

exports.updateHouse = (houseId, houseData) => Housing.findByIdAndUpdate(houseId, houseData);