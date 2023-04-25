const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");

// Rutas
// Importante la barra en app.use('/bla-bla')

app.use("/api/users", usersRoutes);

// Middlewares para cliente
app.use(cors());
app.use(express.json());

// Uso de rutas

app.listen(3000, () => console.log("Servidor en ejecución en el puerto 3000"));
