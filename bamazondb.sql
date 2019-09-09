DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE  products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT (25),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned Dog Food", "Pets", 2.50, 25), ("Water Bottles", "Food", 1.50, 30), ("Socks", "Clothing", 3.99, 20), ("Lamp", "Home Decor", 15.99, 5), ("Camera", "Electronics", 150.00, 2), ("Monopoly", "Games & Toys", 12.99, 10), ("Joke Book", "Books", 10.25, 69), ("Umbrella", "Travel", 3.99, 30), ("Backpack", "Travel", 19.99, 12),("Pencils", "Office Supplies", 2.50, 22);