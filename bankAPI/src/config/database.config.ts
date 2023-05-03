import mongoose from "mongoose";
import {createClient} from "redis";
import options from "./config";

export async function db() {
  const db_url = options.DB_URL;
  if (!db_url)
    throw new Error("Setup your mongoDB connection string on the .env file");
  try {
    await mongoose.connect(db_url);
    console.log("Database connected successful 👍");
    return mongoose.ConnectionStates.connected;
  } catch (error) {
    console.error(error);
  }
}

export const redisClient = createClient({
  url: `redis://127.0.0.1:6379`,
});
redisClient.connect()
redisClient.on("connect", () => {
  console.log("Connected to Redis 👌");
});

redisClient.on("error", err => {
  console.log("Error:", err);
});

//  console.log(redisClient.connect())
