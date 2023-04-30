import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { userMongo } from './usuarioPassport.js'
import bcrypt from 'bcryptjs';

async function registerVerify (username, password, done) {

    try {
        const usuario = await userMongo.findOne({ username: username }) //vamos a implementar mongo. Acá busco si existe algún usuario con el username que quiero usar
        console.log(usuario);
        if (usuario) {
            console.log('el usuario ya esta registrado')
            return done(null, false)
        }
        let hashPassword = await bcrypt.hash(password, 8) // acá encripto la clave!! 

        const newUser = new userMongo({
            username: username,
            password: hashPassword, //la clave va ser esa clave hasheada
        })
        console.log(newUser);
        newUser.save(newUser)
        done(null, newUser)
    } catch (error) {
        console.log(error);
        done(error)
    }
}

export const registerStrategy = new LocalStrategy(registerVerify)

async function loginVerify (username, password, done) {  
    try {
    const usuario = await userMongo.findOne({ username: username }) //vamos a implementar mongo. Acá busco si existe algún usuario con el username que quiero usar
    console.log(usuario);
    if (!usuario) {
        return done('Usuario incorrecto', false)
    }

    const passwordMatched = await bcrypt.compare(password, usuario.password);
    if (passwordMatched) {

        return done(null, usuario)
    }
    else {
        console.log("Password incorrecto");
    }

} catch (error) {
    console.log(error);
    done(error)
}
}
export const loginStrategy = new LocalStrategy (loginVerify)

//Serializamos y desaerializamos
passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    try {
        let usuario = await userMongo.findOne({ username: username })
        done(null, usuario)
    } catch (error) {
        done(error)
    }
})