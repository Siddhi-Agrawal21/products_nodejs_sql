const express= require("express") ;
const mysql= require("mysql") ;
const bodyParser = require("body-parser");// for api calls
const app = express();

app.use(bodyParser.json());

//creating bridge
const db= mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12616666",
  password: "BNGjiZirUK",
  database: "sql12616666", 
});

//creating a connection
db.connect((err)=>{
    if(err) throw err ;
    console.log("mysql connected") ;
});


// middleware to check API key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.query.API_KEY;
    if (apiKey !== "my_secret") {
      return res.status(401).send("Invalid API key");
    }
    next();
  };
  

// apply middleware to all routes
  app.use(apiKeyMiddleware);
  

//creating database
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err) => { 

      if (err) throw err;
      res.send("Database created");

    });

  });

//creating table
  app.get("/createproduct", (req, res) => {
    let sql =  "CREATE TABLE `products` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255) NOT NULL,`category` varchar(255) NOT NULL,`price` decimal(10,2) NOT NULL,PRIMARY KEY (`id`))";  
      db.query(sql, (err) => { 
      if (err) throw err;
      res.send("Product table created"); 

    }); 
  });



  app.get("/api/products", (req, res) => {
    let { page = 1, pageSize = 10, categoryId } = req.query;

    page= parseInt(page);
    pageSize= parseInt(pageSize);

    const offset = (page - 1) * pageSize;
    const limit = pageSize;
  
    let sql = "SELECT * FROM products";
    let countSql = "SELECT COUNT(*) AS count FROM products";
  
    if (categoryId) {
      sql += " WHERE category = ?";
      countSql += " WHERE category = ?";
    }
  
    sql += " ORDER BY id DESC";
    sql += " LIMIT ?, ?";
    
    const values = categoryId ? [categoryId, offset, limit] : [offset, limit];
  
    db.query(sql, values, (err, result) => {
      if (err) throw err;
      
      db.query(countSql, categoryId ? [categoryId] : null, (err, countResult) => {
        if (err) throw err;
        
        const count = countResult[0].count;
        const totalPages = Math.ceil(count / pageSize);
  
        res.send({
          data: result,
          page: Number(page),
          pageSize: Number(pageSize),
          totalPages,
          totalItems: count,
        });
      });
    });
  });  
  

// api for getting all the distinct categories
  app.get("/api/categories", (req, res) => {
    let sql = "SELECT DISTINCT category FROM products";
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  

//api for creating product data
  app.post("/api/products", (req, res) => {
    const { name, category, price } = req.body;
  
    if (!name || !category || !price) {
      return res.status(400).send("Please provide name, category, and price");
    }
  
    const sql = "INSERT INTO products (name, category, price) VALUES (?, ?, ?)";
    const values = [name, category, price];
  
    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });



app.listen("3000", () => {
    console.log("Server started on port 3000");
  });