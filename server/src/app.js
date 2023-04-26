const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");

// Middlewares para cliente MUY IMPORTANTE QUE LOS MIDDLEWARES ESTÉN ARRIBA
app.use(cors());
app.use(express.json());

// Rutas
// Importante la barra en app.use('/bla-bla')
app.use("/api/users", usersRoutes);

app.listen(3000, () => console.log("Servidor en ejecución en el puerto 3000"));
