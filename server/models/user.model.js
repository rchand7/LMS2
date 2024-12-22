import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        default: 'student'
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    photoUrl: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
        required: true,
        unique: true, // Ensures unique values for userName
        trim: true, // Removes any leading or trailing whitespace
        index: true // Indexing the userName for efficient lookup
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);
