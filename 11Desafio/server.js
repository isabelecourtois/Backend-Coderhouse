import { ContenedorSQL } from "./Containers/ContainerSQL.js";
import { optionsSqlite } from "./options/mysqlconn.js";
import Contenedor from "./Containers/Container.js";
import { productosNuevos } from "./Containers/mockProductos.js";

import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from "connect-mongo"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

const usuarios = []

// Setear registro y log-in PASSPORT

passport.use('register', new LocalStrategy({
  passReqToCallback: true    
}, (req, username, password, done) => {
  //const { direccion } = req.body

  const usuario = usuarios.find(usuario => usuario.username == username)
  if (usuario) {
      return done('el usuario ya esta registrado')
  }

  const newUser = {
      username,
      password,
      //direccion
  }
  usuarios.push(newUser)
  console.log(newUser);

  done(null, newUser)
}))

passport.use('login', new LocalStrategy((username, password, done) => {

  const usuario = usuarios.find(usuario => usuario.username == username)
  if (!usuario) {
      return done('no hay usuario', false)
  }

  if (usuario.password != password) {
      return done('password incorrecta', false)
  }

  usuario.contador = 0

  return done(null, usuario)
}))

//Serializamos y desaerializamos

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  const usuario = usuarios.find(usuario => usuario.username == username)
  done(null, usuario)
})

//Cookies & Session

app.use(cookieParser('TeGaneAlan!'))
const mongoAdvOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({

  store: MongoStore.create({
    mongoUrl: "mongodb+srv://rocleco:rocleco@coderhouse.w04bgms.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: mongoAdvOptions
  }),


  secret: "TeGaneAlan!",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:6000
  }
}))

//Iniciamos Passport

app.use(passport.initialize())
app.use(passport.session())


// Rutas de registro 

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'}))

app.get('/failregister', (req, res)=> {
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

    const usuario = usuarios.find(usuario => usuario.username == req.user.username)

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


//Contenedores
const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
const mensajesContenedor = new Contenedor("./Containers/mensajes.txt");

productosContenedor.crearTablaProductos()
  .then(() => {
    console.log("1- tabla creada productos")

    const nuevo = [
      {
        producto: "GoPro",
        precio: "3500",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png",
      },
      {
        producto: "Mapa",
        precio: "250",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-04-2-256.png",
      },
      {
        producto: "Maleta",
        precio: "1850",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-16-256.png",
      },
      {
        producto: "Brújula",
        precio: "500",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-07-256.png",
      }
    ]

    return productosContenedor.save(nuevo)
  })


//Get Faker

app.get("/api/productos-test", async (req, res) => {
  try {
    const productos = await productosNuevos(5);
    res.render("index", { productos: productos, });
    console.log(productos);
  } catch (error) {
    console.log(error);
  }

});


//Socket

io.on("connection", async (socket) => {
  console.log("Un usuario se conectó");

  const productos = await productosContenedor.getAll();
  socket.emit('productos', productos);
  socket.on("newProduct", async (data) => {
    await productosContenedor.save(data);
    io.sockets.emit('productos', await productosContenedor.getAll());
  })


  const mensajes = await mensajesContenedor.getAllNormalizr();
  socket.emit('messages', mensajes);
  socket.on('newMessage', async (data) => {
    await mensajesContenedor.save(data);
    io.sockets.emit("messages", await mensajesContenedor.getAllNormalizr());
  })
  //console.log(mensajes);

})

app.get("/compresion", async (req, res) => {
  try {
    const porcentaje = await mensajesContenedor.compresion();
    res.render(porcentaje);
    console.log(porcentaje);
  } catch (error) {
    console.log(error);
  }
});

const PORT = 8080

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})