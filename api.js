const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("multer");

app.use(require("cors")());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(require("./routes"))


const server = http.createServer(app); 
server.listen(process.env.PORT || 3030);