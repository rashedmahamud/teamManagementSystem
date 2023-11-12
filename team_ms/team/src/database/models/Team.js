const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    category: String,
    available: Boolean,
});

module.exports =  mongoose.model('team', TeamSchema);