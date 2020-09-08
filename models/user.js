const mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        require :' please submit a name',
        trim : true
    },
    email : {
        type: String,
        unique: true,
        lowercase : true,
        trim: true,
        require: 'please supply an email address'
    },
});
schema.plugin(passportLocalMongoose,{usernameField:'email'})
module.exports = mongoose.model('user', schema)