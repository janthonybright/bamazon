let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
user: "root",
password: "root",
host: "localhost",
port: 8889,
database: "bamazon_db"
});

connection.connect(function (err){
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            type: "list",
            message: "Welcome to Bamazon! What would you like to purchase?",
            choices: ["Exit"]
        })
}