const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const database = require("./db/db");
const routes = require("./routers/routes");


try {
    database.sync().then(() => {
    })
}
catch (erro) {
    console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.use("/", routes)
app.listen(3000);