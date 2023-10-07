const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (dateOfBirth) {
                const currentDate = new Date();
                const minDate = new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate());
                return dateOfBirth <= minDate;
            },
            message: 'Student must be at least 3 years old.',
        },
    },
    gender: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (phoneNumber) {
                return /^\d{10}$/.test(phoneNumber);
            },
            message: 'Phone number must be 10 digits.',
        },
    },
    address: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("products", productSchema);
