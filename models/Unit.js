const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
        name: { type: String, required: true },
        large: { type: String, required: true },
        small: { type: String, required: true },
        ratio: { type: Number, required: true }
    },
    { timestamps: true }
);
module.exports = mongoose.model('Unit', UnitSchema, 'Unit');