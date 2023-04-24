require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")

//Configuração do App
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);
const Produto = require("./models/produto");

//ROTAS

//Inserção do produto;
app.post("/produtos", async (req, res) => {
    try{
        const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria } = req.body;
        const novoProduto = new Produto ({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria });
        await novoProduto.save();
        res.status(201).json(novoProduto);

    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// Listagem de todas os produtos (GET);
app.get("/produtos", async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos)
});

// Listagem de produtos por id (GET)
app.get("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params; // captura o id passado na rota
        produtoExistente = await Produto.findById(id); // realiza a busca do documento em cima do id passado na rota

        if (produtoExistente) { // se existir a tarefa responde ela
            res.status(200).json(produtoExistente);
        } else { //se não exister retorna o erro
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// Atualização de uma Produto (PUT)
app.put("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params // -> busca o id digitado na rota
        const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria } = req.body; // -> busca as informações no corpo da requisição
        const produtoExistente = await Produto.findByIdAndUpdate(id, { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria }); // findByIdAndUpdate -> primeiro passa o id, se encontrar passa os dados que vai atualizar;
        if (produtoExistente) {
            res.json({ message: "Produto editado." })
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// Remoção de um produto;
app.delete("/produtos/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const produtoExistente = await Produto.findByIdAndRemove(id);
        if (produtoExistente){
            res.json({ message: "Produto excluido." });
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});








//Escuta de eventos
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});