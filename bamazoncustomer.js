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
            name: "start",
            type: "list",
            choices: [productList()]
        });
}

function productList() {
    connection.query(
        "SELECT * FROM products",
        function (err, data) {
            if (err) throw err;
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].item_id)
                console.log("ID: " + data[i].item_id)
                console.log("Product Name: " + data[i].product_name)
                console.log("Price: " + data[i].price)
                if (data[i].stock_quantity > 0) {
                    console.log("In Stock")
                } else {
                    console.log("Out Of Stock")
                }
                console.log("======================================")
            }
        inquirer
            .prompt([
                {
                name: "products",
                type: "list",
                message: "Welcome to Bamazon! What would you like to purchase?",
                choices: function () {
                    return arr;
                }},
                {
                    name: "quantity",
                    type: "input",
                    message: "Select quantity of your selected item."
                }
            ]).then(function(answer) {
                let userChoice;
                for (let i = 0; i < data.length; i++) {
                    if (answer.products === data[i].item_id)
                        userChoice = data [i];
                }
                if (answer.quantity > userChoice.stock_quantity) {
                    console.log("Stock Insufficient");
                    connection.end();
                    
                } else if (answer.products === userChoice.item_id) {
                    connection.query(
                    'UPDATE products SET ? WHERE ? ',
                    [
                        {
                            stock_quantity: (userChoice.stock_quantity)
                        },
                        {
                            item_id: userChoice.item_id
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log(userChoice.product_name + 'Order Successful');
                        console.log('Purchase Total: ' + (parseInt(answer.quantity) * userChoice.price))
                        console.log('Quantity Total: ' + (userChoice.stock_quantity - parseInt(answer.quantity)))
                        console.log('\n=======================================\n')
                        setTimeout(start, 10000)  
                    })
                }
            })
        }
    )
}