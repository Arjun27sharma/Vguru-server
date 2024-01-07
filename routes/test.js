const express = require("express");
const Test = require("../models/Test");
const router = express.Router()
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const verifyToken = (req, res, next) => {
    // Get token from the header
    const token = req.header('Authorization')?.split(' ')[1]; // Assumes token is sent as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user payload to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};


router.get("/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const tests = await Test.find({ student: studentId });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.post("/add", verifyToken ,async (req, res) => {
    try{
        const test = await Test.create({...req.body, student : req.user.id});
        const user = await User.findById(req.user.id);
        user.tests.push(test);
        await user.save();
        res.status(201).json({ message: 'Test created successfully', test });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})


module.exports = router
