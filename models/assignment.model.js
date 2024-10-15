const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema(
    {
            assignment_name:{
                type: String,
                required: true
            },
            due_date:{
                type: Date,
                required: true
            },
            time: {
                type: Date,
                required: true,
                unique: true
            },
            module: {
                type: String,
                required: true
                
            }
    }

);

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;