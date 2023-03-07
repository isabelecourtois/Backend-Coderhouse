import express from "express";
import { Server as HttpServer } from "http";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from "connect-mongo"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs';

import prodRouter from "./routes/productos.js";
import cartRouter from "./routes/carrito.js";
import { userMongo } from "./db/usuarioPassport.js";

//ENV
dotenv.config();

//Permiso de administrador para agregar productos
export const admin = true;

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

//AUTENTICACIÓN

const usuarios = new userMongo

// Setear registro y log-in PASSPORT

passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {

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
}))


passport.use('login', new LocalStrategy(async (username, password, done) => {

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
}))

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

//Cookies & Session

app.use(cookieParser(process.env.SECRET))
const mongoAdvOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({

  store: MongoStore.create({
    mongoUrl:process.env.MONGO_COOKIES,
    mongoOptions: mongoAdvOptions
  }),


  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6000
  }
}))

//Iniciamos Passport

app.use(passport.initialize())
app.use(passport.session())


// Rutas de registro 

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

app.get('/failregister', (req, res) => {
  res.render('register-error')
})


// Rutas de login 

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/index')
  }

  res.render('login')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/login-error', successRedirect: '/index' }))

app.get('/login-error', (req, res) => {
  res.render('login-error')
})

// Rutas de index 

function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

app.get('/index', requireAuthentication, (req, res) => {
  if (!req.user.contador) {
    req.user.contador = 0
  }

  req.user.contador++

  const usuario = Array.from(usuarios).find(usuario => usuario.username == req.user.username)

  res.render('index', {
    datos: usuario,
    contador: req.user.contador
  })
})

// Ruta de logout 

app.get('/logout', (req, res) => {
  req.logout(err => {
    res.redirect('/login')
  })
})


// Ruta raiz //


app.get('/', (req, res) => {
  res.redirect('/index')
})



app.use("/api/productos", prodRouter);
app.use("/api/carrito", cartRouter);

/* app.use((req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' error  '${req.method}' `,
    });
  });
  
  
  app.listen(PORT, () => {
    console.log(`RUN http://localhost:${PORT}`);
  }); */

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})