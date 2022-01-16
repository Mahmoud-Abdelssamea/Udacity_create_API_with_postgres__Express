# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- create route "api/users/signup" [POST]
- Show route "api/users/login" [GET]
- index route "api/users/index" [GET]
- update route "api/users/update/:id" [PUT] [TOKEN REQUIRED]
- delete route "api/users/delete/:id" [PUT] [TOKEN REQUIRED]

#### Orders

- Current Order by user [args: user id](token required)
- [OPTIONAL] Completed Orders by user [args: user id](token required)

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
- created_at (date and time)

##### order_product table

- product_id INT foreign key for product table
- order_id INT foreign key for orders table
- quantity INT
