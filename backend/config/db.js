import mongoose from "mongoose";
const conneectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB, ${conn.connection.host}`.bgGreen)
    } catch (error) {
        console.log(`Error MongoDB, ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
export default conneectDB