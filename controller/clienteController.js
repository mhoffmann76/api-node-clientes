
const Cliente = require("../model/clienteModel");
module.exports = class clienteController {
  static async ClienteCreate(req, res) {
    try {
      const { nome, endereco, telefone, email, nascimento } = req.body;

      const cliente = new Cliente({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email
       
      });

      await cliente.save();
      res.json({ message: "Cadastro realizado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar cliente." });
    }
  };


  static async ClienteListar(req, res) {
    const cliente = await Cliente.findAll({ raw: true })
    res.json(cliente);
  }

  static async ClienteListarId(req, res) {

    try {
      const matricula = req.params.id;

      const cliente = await Cliente.findOne({ where: { matricula: matricula } });
      if (!cliente) {
        res.status(404).json({ error: "Cliente não localizado" });
      } else {
        res.json(cliente);
      }

    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao obter as informações do cliente. " });
    }

  }


  static async ClienteUpdate(req, res) {
    const matricula = req.params.id;
    let nome = req.body.nome;
    let endereco = req.body.endereco;
    let telefone = req.body.telefone;
    let email = req.body.email;
    
    const cliente = {
      nome: nome,
      endereco: endereco,
      telefone: telefone,
      email: email
    
    };
    await Cliente.update(cliente, { where: { matricula: matricula } })
    res.json({ message: "Cadastro atualizado com sucesso!" , dados: cliente })

  }


  static async ClienteDelete(req, res) {
    try {
      const matricula = req.params.id;
      const resultado = await Cliente.destroy({ where: { matricula: matricula } });
  
      if (resultado === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
  
      return res.json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao excluir o cliente." });
    }
  }
  
}
