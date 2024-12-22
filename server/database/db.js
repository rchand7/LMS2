import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Using the connection string from environment variables (ensure it's set in .env)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB:', error);
    }
}

export default connectDB;
