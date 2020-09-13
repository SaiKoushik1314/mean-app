const mongoose = require("mongoose");

var Employee = mongoose.model('Employees',{
        name: {type: String},
        position: {type: String},
        office: {type: String},
        salary: {type: Number}
});

module.exports = {Employee};