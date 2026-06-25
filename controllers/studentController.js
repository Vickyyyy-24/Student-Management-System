const Student = require("../models/studentModel");

//Create Student
exports.createStudent = async (req, res) => {
    try {
        let { name, email, mobileNo, gender } = req.body;
        // File Image required check
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required",
            });
        }
        const profileImage = req.file.filename;

        const student = new Student({
            profileImage,
            name,
            email,
            mobileNo,
            gender
        });

        await student.save();

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

//Read all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            message: "Students fetched successfully",
            data: students
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


//Get Single Student
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                message: " Student Not Found"
            });
        }
        res.status(200).json({
            message: " Student Data Founded",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Sever Error",
            error: error.message
        });
    }
};

//update student data
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const student = await Student.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found",
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            data: student,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

//delete student 
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({
                message: " Student Not Found"
            });
        }
        res.status(200).json({
            message: " Student Data Deleted",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Sever Error",
            error: error.message
        });
    }
};