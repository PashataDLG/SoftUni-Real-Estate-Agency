const Housing = require('../models/Housing');

exports.create = (houseData) => Housing.create(houseData);

exports.getAll = () => Housing.find();

exports.getById = (houseId) => Housing.findOne({ _id: houseId });

exports.getByIdDetailed = (houseId) => Housing.findOne({ _id: houseId }).populate('rentedHome');

exports.updateHouse = (houseId, houseData) => Housing.findByIdAndUpdate(houseId, houseData);

exports.deleteHouse = (houseId) => Housing.findByIdAndDelete(houseId);

exports.searchForHouse = (searchInput) => Housing.find({ type: searchInput });