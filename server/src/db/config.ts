import mongoose, { connect } from "mongoose";

 const connectDB = async () =>{
    try {
       const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/todo-app`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Error connecting : ', error)
        process.exit(1)
    }
 }

export {
    connectDB
}