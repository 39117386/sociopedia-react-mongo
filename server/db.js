import mongoose from "mongoose";

let cachedConnection = null;
let connectionPromise = null;

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cachedConnection = await connectionPromise;
  return cachedConnection;
};
