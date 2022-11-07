// Peticiones http a otros servidores
const axios = require("axios").default;

// Configuración al servidor
const app = require("express")(); // Al poner esto aqui indicamos que express ya se esta ejecutando
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(http, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("roomEntry", (info) => {
    console.log("Usuario conectado a la sala: " + info.room);
    socket.join(info.room);
  });

  socket.on("sendMessage", (info) => {
    console.log("Enviando el mensaje: " + info.message);
    console.log("Al grupo: ", info.room);
    socket.to(info.room).emit("reciveMessage", info.message);
  });
});

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

http.listen(port, () => {
  console.log("Escuchando por el puerto: " + port);
});
