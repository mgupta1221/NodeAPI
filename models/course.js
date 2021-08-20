const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course; // Notice we are Exporting an Object with one property as 'Course'