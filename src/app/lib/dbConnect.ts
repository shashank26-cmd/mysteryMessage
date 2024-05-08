import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

//void means dc what kind of data is getting return
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "",{});
    connection.isConnected = db.connections[0].readyState;

    console.log("db connected successfully")
  } catch (e) {
console.log(e);
process.exit(1);

  }
}

export default dbConnect;