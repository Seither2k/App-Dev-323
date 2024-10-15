const express = require('express');
const Student = require('../models/student.model.js');
const { error } = require('winston');
const router = express.Router();


//This is to get all the list of students
router.get('/', async(req, res)=> {
    try {
        const student = await Student.find({});
        res.status(200).json(student);

    }
    catch{ (error)
    res.status(500).json({message: error.message});
    }
});


//This is to add a student
router.post('/add', async (req,res)=>{
    try{
        const student = await Student.create(req.body);
        res.status(200).json(student)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

//Look for a certain student and then update
router.put('/update/:id', async (req, res)=>{
    try {
        const {id} = req.params;

        const student = Student.findByAndUpdate(id, req.body);
        
        if (!student) {
            return res.status(404).json({message: "Student not found"});
            
        }
        const updatedStudent = await student.findById(id);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.delete('/delete/:studentNumber', async (req, res) => {
    try {
        const { studentNumber } = req.params; // Get studentNumber from the route parameters

        const deletedStudent = await Student.findOneAndDelete({ studentNumber }); // Find and delete the student by studentNumber
        
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" }); // If the student is not found, return a 404
        }
        
        res.status(200).json({ message: "Student deleted successfully", student: deletedStudent }); // Respond with success and the deleted student
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors that occur
    }
});


module.exports = router;
