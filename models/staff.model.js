const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema(
    {
            name:{
                type: String,
                required: true
            },
            surname:{
                type: String,
                required: true
            },
            lecturer_id: {
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
            }
    }

);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;