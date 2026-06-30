//password:zZIY03XFU40VEkG0 of mogodb atlas
//connection string:mongodb+srv://ishikaaa:zZIY03XFU40VEkG0@cluster0.nozopii.mongodb.net/?appName=Cluster0

const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connnected");
    }
    catch(error){
        console.log("MongoDB connection errror");
        console.log(error);

        process.exit(1);
    }
   };

   module.exports=connectDB;
