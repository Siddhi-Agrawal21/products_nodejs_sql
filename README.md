To set up and run the project, follow these steps:

1. Install Required Dependencies:
   - Open the terminal in Visual Studio Code.
   - Navigate to the project directory.
   - Run the following command to install the required dependencies:
     ```
     npm install express mysql body-parser
     ```

2. Set Up the Database Connection:
   - Replace the database connection configuration in the code with your own MySQL database credentials. Modify the following lines in the code:
     ```javascript
     const db = mysql.createConnection({
       host: "your_host",
       user: "your_username",
       password: "your_password",
       database: "your_database",
     });
     ```
     Replace `'your_host'`, `'your_username'`, `'your_password'`, and `'your_database'` with your MySQL server details.

3. Create the Database and Table:
   - In the terminal, run the following command to create the database:
     ```
     node index.js /createdb
     ```
   - Run the following command to create the product table:
     ```
     node index.js /createproduct
     ```

4. Start the Server:
   - In the terminal, run the following command to start the server:
     ```
     node index.js
     ```
   - You should see the message "Server started on port 3000" in the console, indicating that the server is running.

5. Test the API Endpoints:
   - Use a tool like Postman or curl to send requests to the API endpoints and test their functionality.

   - GET `/api/products`: Retrieves all products or filters products by category. You can add query parameters like `categoryId` or `page` and `pageSize` for pagination.
     Example request: `GET http://localhost:3000/api/products?categoryId=1&page=1&pageSize=10`

   - GET `/api/categories`: Retrieves all distinct categories.
     Example request: `GET http://localhost:3000/api/categories`

   - POST `/api/products`: Creates a new product by sending a JSON payload in the request body.
     Example request: `POST http://localhost:3000/api/products`
     Request body: `{ "name": "Product Name", "category": "Product Category", "price": 9.99 }`

6. API Key Validation:
   - The code includes an API key validation middleware to check for a valid API key. Modify the middleware logic to match your requirements.

That's it! You have set up and run the project. You can now customize and extend the functionality as needed.


