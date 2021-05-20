const { Schema, model } = require("mongoose");

transferSchema = new Schema({ 
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
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports.transferModel = model('transfer', transferSchema)