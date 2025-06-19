import mongoose from "mongoose"

 const connectDB = async () => {
    try {
        // console.log(`${process.env.MONGO_URI}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/flipkart-db`);
        console.log(`Database connected successfully at ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error in connecting to database: ",error)
    }
}


export default connectDB;