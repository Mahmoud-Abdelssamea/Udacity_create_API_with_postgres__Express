# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

| FUNCTION | ROUTE                                         | METHOD   | TOKEN REQUIRED |
| -------- | --------------------------------------------- | -------- | -------------- |
| INDEX    | api/products/index/                           | [GET]    | NO             |
| SHOW     | api/products/show/:product_id                 | [GET]    | NO             |
| CREATE   | api/users/:user_id/product/create             | [POST]   | YES            |
| DELETE   | api/users/:user_id/product/delete/:product_id | [DELETE] | YES            |

#### Users

| FUNCTION | ROUTE                | METHOD   | TOKEN REQUIRED | NOTE        |
| -------- | -------------------- | -------- | -------------- | ----------- |
| CREATE   | api/users/signup     | [POST]   | NO             |             |
| SHOW     | api/users/login      | [POST]   | NO             |             |
| INDEX    | api/users/index/:id  | [GET]    | NO             | id for user |
| UPDATE   | api/users/update/:id | [PUT]    | YES            | id for user |
| DELETE   | api/users/delete/:id | [DELETE] | YES            | id for user |

#### Orders

| FUNCTION             | ROUTE                                   | METHOD   | TOKEN REQUIRED | NOTE |
| -------------------- | --------------------------------------- | -------- | -------------- | ---- |
| CREATE               | api/users/:user_id/orders/create        | [POST]   | YES            |      |
| ADD_PRODUCT TO ORDER | api/users/:user_id/orders/add/:order_id | [POST]   | YES            |      |
| SHOW CURRENT ORDER   | api/users/:user_id/orders/add/:order_id | [GET]    | YES            |      |
| DELETE               | api/users/:user_id/orders/add/:order_id | [DELETE] | YES            |

## Data Shapes

#### Product

##### product table

- id SERIAL PRIMARY KEY
- name VARCHAR
- price FLOAT
- category VARCHAR

#### User

##### users table

- id SERIAL PRIMARY KEY,
- firstName VARCHAR(100) NOT NULL
- lastName VARCHAR(100) NOT NULL
- password VARCHAR(300) NOT NULL

#### Orders

##### orders table

- id SERIAL PRIMARY KEY
- user_id INT foreign key for users table
- status VARCHAR

##### order_product table

- id SERIAL PRIMARY KEY
- product_id INT foreign key for product table
- order_id INT foreign key for orders table
- quantity INT
