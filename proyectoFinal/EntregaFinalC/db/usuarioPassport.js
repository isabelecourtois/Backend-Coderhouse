import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()


mongoose.connect(process.env.MONGO_PASSPORT,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//const Schema = mongoose.Schema;

const User = new Schema({ 
    username: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, require: true, max: 200},
    phone: {type: String, require: true, max: 20},
    cartId:{type: String, require: true},
    email:{type: String, require: true, max: 30},
    timestamp:{type: String, require: true}
})

User.pre('save', async function (next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


export const userMongo = mongoose.model('userMongo', User);