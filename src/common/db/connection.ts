import mongoose from "mongoose";
import {ADMIN_PORt, DB_URL} from "../config";

export async function connectDB() {
    try{
        mongoose.set("debug",true);
        await mongoose.connect(DB_URL);
        console.log("connected db")
    }
    catch(e){
        console.log(e)
    }

}