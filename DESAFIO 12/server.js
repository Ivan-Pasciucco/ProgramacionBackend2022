const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const Chat = require("./js/chat")
const chat = new Chat()

const Productos = require("./js/productos")
const productos = new Productos()

const loginRouter = require("./routes/loginRouter")
const indexRouter = require("./routes/indexRouter")

// Inicializar express, http y socket.io
const app = express()
const httpserver = new HttpServer(app)
const io = new IOServer(httpserver)

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use("/", indexRouter)
app.use("/login", loginRouter)

// sockets
io.on("connection", async (socket) => {
  console.log("Usuario conectado")

  // productos faker
  socket.emit("productosFaker", productos.RandomProducts())

  //socket chat
  socket.on("nuevoMensaje", async (data) => {
    try {
      await chat.addMessage(data)
      const mensajes = await chat.readMessages()
      io.sockets.emit("historialGlobal", mensajes)
    } catch (e) {
      console.log(`Ha ocurrido el siguiente error: ${e}`)
    }
  })
  try {
    const mensajes = await chat.readMessages()
    socket.emit("historialChat", mensajes)
  } catch (e) {
    console.log(`Ha ocurrido el siguiente error: ${e}`)
  }
})

httpserver.listen(8080, () => {
  console.log(`Servidor corriendo en el puerto: 8080`)
})
