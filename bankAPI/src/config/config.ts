import dotenv from "dotenv"

dotenv.config()

const options = {
  NODE_ENV: process.env.NODE_ENV,
  server: {
    PORT: process.env.PORT,
    URL: process.env.SERVER_URL,
  },
  jwt: {
    access_token: {
      SECRET: process.env.ACCESS_TOKEN_SECRET,
      EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
    },
    refresh_token: {
      SECRET: process.env.REFRESH_TOKEN_SECRET,
      EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
      // cookie_name: process.env.REFRESH_TOKEN_COOKIE_NAME,
    },
  },
  DB_URL: process.env.MONGO_DB_URL,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PORT: process.env.REDIS_PORT
};

export default options