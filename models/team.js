const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    title: String,
    location: String,
    image: String,
    cost: Number,
    description: String,
    sport: String,
    // date: String,
    league: String,
    level: String,
});

module.exports = mongoose.model('Team', TeamSchema);




// // GIVES US A BASIC MODEL TO BEGIN WITH