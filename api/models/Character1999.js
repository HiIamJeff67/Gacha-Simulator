const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    rateUp: {
        type: Boolean,
        required: true
    },
    rateEnd: {
        type: Number,
        required: true
    },
    rateStart: {
        type: Number,
        required: true
    }
})

const Chr1999 = mongoose.model("summonPool", CharacterSchema, "summonPool");
module.exports = Chr1999;