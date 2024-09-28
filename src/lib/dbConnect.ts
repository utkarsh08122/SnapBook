import mongoose from "mongoose";

module.exports = async () => {
  //   const mongoosurl = "mongodb+srv://uks08122002:cZTIXsWR09nSSKin@cluster0.3jzlu.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0"
  const mongoosurl =
    "mongodb+srv://uks08122002:2XnNR5YQnHhN7Z86@cluster0.dowv7.mongodb.net/SnapBook?retryWrites=true&w=majority&appName=Cluster0";
  // "mongodb+srv://uks08122002:3Y9Ev9As3ZyA@cluster0.ulchc.mongodb.net/SnapBook?retryWrites=true&w=majority";
  try {
    await mongoose.connect(mongoosurl);
    console.log("connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
