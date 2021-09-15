const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Initialisation de la database avec mongoose
const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user"];

module.exports = db;