const { model, Schema } = require("mongoose");

//nome, descrição, quantidade, preço, desconto, dataDesconto, categoria, imagem do produto
const Produto = model( "produto", new Schema ({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    quantidade: {
        type: String,
        require: true,
    },
    preco: {
        type: String,
        required: true,
    },
    desconto: {
        type: String,
        required: false,
    },
    dataDesconto: {
        type: String,
        required: false,
    },
    categoria: {
        type: String,
        required: true,
    },
}));

module.exports = Produto;