const express = require('express');
const Feedback = require('../models/feedback.model.js'); // Make sure to import Assignment, not Student
const { error } = require('winston');
const router = express.Router();


//This is to get all the list of feedback
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the route parameters
        const feedback = await Feedback.findById(id); // Find feedback by ID

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" }); // Return 404 if not found
        }

        res.status(200).json(feedback); // Return the found feedback
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});


//This is to add a assignment
router.post('/add', async (req,res)=>{
    try{
        const feedback = await Feedback.create(req.body);
        res.status(200).json(feedback)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

//Look for a certain assignment and then update
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true }); // Use findByIdAndUpdate
        
        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the id from the route parameters

        const deletedFeedback = await Feedback.findByIdAndDelete(id); // Find and delete the assignment by id
        
        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found" }); // If the assignment is not found, return a 404
        }
        
        res.status(200).json({ message: "Feedback deleted successfully", assignment: deletedFeedback }); // Respond with success and the deleted assignment
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors that occur
    }
});


module.exports = router;