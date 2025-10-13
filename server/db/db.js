//to create the connection with the database
import mongoose from "mongoose";

const connectToDatabase = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("Error while connecting to database",error.message);
    }
}
export default connectToDatabase;