const express = require("express");
const router = express.Router();

const clienteController = require("../controller/clienteController");

router.get("/", (req, res) => {
  return res.json({ message: "Sejam bem vindo a nossa API!" });
});

router.post("/cadastrar", clienteController.ClienteCreate);

router.get("/listar-clientes", clienteController.ClienteListar);
router.get("/listar-clientes/:id", clienteController.ClienteListarId);
router.delete("/clientes-delete/:id", clienteController.ClienteDelete)
router.put("/clientes-update/:id", clienteController.ClienteUpdate)


module.exports = router;
