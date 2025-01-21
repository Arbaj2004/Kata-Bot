const mongoose = require('mongoose');
const validator = require('validator');

const contactusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // No unique: true here
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
const ContactUs = mongoose.model('ContactUs', contactusSchema);

module.exports = ContactUs;