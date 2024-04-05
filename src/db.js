import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/PanelAdmin");
        console.log("db is conected");
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
}
