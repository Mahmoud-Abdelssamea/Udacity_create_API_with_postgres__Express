# Storefront Backend Project

## Description

It's an API for online store using nodejs, express and Postgres.
architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

## installation

After download the folder on your device, just use _CLI_ and write the next command

> `npm install`

## Instructions

1.  > to run the API it's required these varilables

| VARIABLES    | REASON                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| PORT         |                                                                               |
| SECRITKEY    | for JWT                                                                       |
| SALT         | FOR HASHING PASSWORD                                                          |
| DB_HOST      | DATABASE HOST TO CONNECT WITH IT                                              |
| DB_USER      | DB USER TO CONNECT WITH IT                                                    |
| DB_PASSWORD  | DATABASE PASSWORD                                                             |
| DB_NAME      | DATABASE NAME                                                                 |
| DB_NAME_TEST | FOR TESTING WILL BE "testDB"                                                  |
| ENV          | for testing it's required to put value ="test" and for dev. mode value ="dev" |

2.  > the required parameters for API

3.  for compiling typescript to javascript with watching just write on _CLI_
    > `npm run tsc`
4.  for testing _API_ write on _CLI_

    change put the variable 'ENV=test' before starting test then write command

    > `npm run test`

5.  for formatting using prettier
    > `npm run format`
6.  for checking code by Eslint
    > `npm run lint`
7.  for running server on using nodemon package

    1.  > put the variable 'ENV=dev' in .env file before start testing
    2.  create db
    3.  create tables
        > `db-migrate up`
    4.  start server > `npm run dev`

8.  for running server on without nodemon package
    change put the variable 'ENV=dev' before starting test then write command
    > `npm run start`

## License
