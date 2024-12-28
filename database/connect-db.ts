const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL)
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.DATABASE_URL;
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
