// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    count: { type: Number, required: true, default: 0 },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
