const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Julia2404",
  database: "finalblog",
});

connection.connect((err) => {
  if (err) throw err;

  return console.log("Banco de Dados Rodando");
});

module.exports = connection;
