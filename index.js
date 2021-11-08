const express = require("express");
const app = express();

//        *****MIDDLEWARES*****

// middleware propio de express

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// middlewares propios

const fechaSolicitud = (req, res, next) => {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  req.requestTime = hoy.toUTCString();
  next();
};

// app.use(fechaSolicitud);

// app.use((req, res, next) => {
//   const tiempoTranscurrido = Date.now();
//   const hoy = new Date(tiempoTranscurrido);
//   req.requestTime = hoy.toUTCString();
//   next();
// });

//           *****RUTAS*****

app.get("/middleware", fechaSolicitud, (req, res) => {
  res.send(`Solicitud enviada el: ${req.requestTime}`);
});

app.get("/middleware-2", (req, res) => {
  res.send(`Solicitud enviada el: ${req.requestTime}`);
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/html", (req, res) => {
  res.send("<h1>Respuesta Enviada</h1>");
});

app.get("/redirect", (req, res) => {
  res.redirect("/");
});

app.get("/usuario", (req, res) => {
  console.log(req.headers);
  res.send(req.headers);
});

app.post("/usuario", (req, res) => {
  res.json({
    id: 1,
    name: "Alex Santacruz",
  });
});

app.get("/parametros/:nombre/:nota", (req, res) => {
  console.log(req.params);
  res.end();
});

app.get("/status", (req, res) => {
  res.sendStatus(500);
});

// middleware para rutas no configuradas
app.use((req, res, next) => {
  res.status(404).send("ruta no configurada o temporalmente fuera de servicio");
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), (req, res) => {
  console.log("Servidor corriendo en puerto: " + app.get("port"));
});
