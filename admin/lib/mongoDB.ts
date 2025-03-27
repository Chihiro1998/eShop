import mongoose from "mongoose";


let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)


    if (isConnected) {
        console.log("mongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "test"
        })
        isConnected = true;
        console.log("mongodb is connected")
    } catch (err) {
        console.log(err)
    }
}
