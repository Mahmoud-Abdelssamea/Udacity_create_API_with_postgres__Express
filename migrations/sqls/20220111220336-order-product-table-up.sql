CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES product(id) ON DELETE CASCADE,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    quantity INT NOT NULL
);