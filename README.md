# Go-book-back
A book lib api created using Node.js, Express, TypeORM

## Main techs and libs

 - Node.js
 - Express
 - TypeORM
 - Eslint
 - Jasmine
 - Mysql

## Project initialization

 ### 1- Download the project

 ### 2- Install the dependencies:

   ```javascript
    npm install
   ```

  ```javascript
    yarn
   ```

 ### 3- Make sure you have a Mysql instance on version 8 and create a database called 'goBooks'.
 
 ** In case of privilages erros, here's a comand of mysql that might resolve it: **
 ```
  “ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'”
 ``` 


 ### 4- Once created the mysql insntance you can set the database settings on the file 'ormconfig.json'


 ### 5- run the migrations using the comand:

  ```javascript
    yarn typeorm migration:run
   ```
   Or

  ```javascript
    npm run typeorm migration:run
   ```
 ### 6- Start the project using the comand:

  ```javascript
      npm dev
  ```
  Or

  ```javascript
      npm run dev
  ```

 ## API Docs

  You can access the api docs using the path /api-docs. Example:

  ```
  http://localhost:3333/api-docs
  ```

## Tests

  You can run the tests using the comand:

  ```javascript
      yarn test
  ```
  or

   ```javascript
      npm run test
  ```

## Coverage

  You can check the coverage of the project:

   ```javascript
      yarn coverage
  ```
  or

   ```javascript
      npm run coverage
  ```
