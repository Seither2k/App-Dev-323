const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema(
    {
            model_mark:{
                type: Number,
                required: true
            },
            text_feedback:{
                type: String,
                required: true
            },
            submission_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Submission',
                required: true
            }
    }
           

);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;