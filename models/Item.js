const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    _type: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    airedAt: {
        type: Date,
        default: Date.now,
        required: false
    }

})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;