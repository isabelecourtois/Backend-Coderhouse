import MongoStore from "connect-mongo"
import dotenv from 'dotenv'
dotenv.config();

const mongoAdvOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export const optionsSessions = {

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_COOKIES,
      mongoOptions: mongoAdvOptions
    }),
  
  
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000
    }}