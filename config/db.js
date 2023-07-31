const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected at the port ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = dbConnect;
