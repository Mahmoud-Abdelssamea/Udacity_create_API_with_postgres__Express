CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price FLOAT(2) NOT NULL,
    category VARCHAR(50)
);