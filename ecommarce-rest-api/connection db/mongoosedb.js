const mongodbinstance = require('mongoose');


mongodbinstance.connect("mongodb://localhost:27017/ecommarce");
module.exports = mongodbinstance;