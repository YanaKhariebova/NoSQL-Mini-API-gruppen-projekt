import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
