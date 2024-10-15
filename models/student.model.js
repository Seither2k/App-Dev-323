const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
            name:{
                type: String,
                required: true
            },
            surname:{
                type: String,
                required: true
            },
            studentNumber: {
                type: String,
                required: true,
                unique: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password:{
                type: String,
                required: true
            },
            role: { // Add a role field to define user roles
                type: String,
                enum: ['admin', 'teacher', 'student'], // Possible roles
                default: 'student' // Default role is 'student'
            }
    }

);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;