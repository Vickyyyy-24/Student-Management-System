const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);

