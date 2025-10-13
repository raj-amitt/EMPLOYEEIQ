//Saving this for future refernece, this file is just to create an admin user in the DB
import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () =>{
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin123",10);
        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save();
    }catch (error) {
        console.log("Error while inserting user seed data",error.message);
    }
}
userRegister();