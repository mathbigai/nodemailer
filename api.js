const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("multer")();

app.use(require("cors")());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.post('/enviarContato', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const comentario = req.body.comentario;
    const celular = req.body.celular;
    const cidade = req.body.cidade;
    const unidade = req.body.unidade;
    require("./nodemail.js")(email, nome, comentario, celular, cidade, unidade)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

app.post('/enviarOrcamentoLacerda', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const celular = req.body.celular;
    const cidade = req.body.cidade;
    const unidade = req.body.unidade;
    const valorMedio = req.body.valorMedio;
    const tipoCliente = req.body.tipoCliente;
    const anexo = req.file;
    require("./nodemailLacerda.js")(email, nome, celular, cidade, unidade, valorMedio, anexo, tipoCliente)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = http.createServer(app); 
server.listen(3030);
console.log("Servidor escutando na porta 3030...")