import MongoStore from "connect-mongo";
import * as dotenv from 'dotenv';
dotenv.config();

const MongoAdvancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_COOKIES,
  mongoOptions: MongoAdvancedOptions,
  ttl: 600,
});