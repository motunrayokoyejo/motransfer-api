const mongoose = require("mongoose");

transferSchema = mongoose.Schema({ 
    name : {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    amount : Number,
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Transfer', transferSchema)