import mongoose from "mongoose"

const connectDb = async () => {
  try{  
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("coonect Db")
  }
  catch(error){
    console.log(`Database error ${error}`)

  }
}

export default connectDb