const express = require("express");
const app = express();
const port = 5500;

// db connection
const dbConnection = require("./db/dbConfig");

// User routes middleware file
const userRoutes = require("./routes/userRoute");

// question routes middleware file
const questionsRoutes = require("./routes/questionRoute");

// authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract json data
app.use(express.json());

//ser routes middleware
app.use("/api/users", userRoutes);

// question routes middleware ??
app.use("/api/questions", authMiddleware, questionsRoutes);

// answer routes middleware ??

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    app.listen(port);
    console.log("database connection stablished");
    console.log("listening on port 5500");
  } catch (error) {
    console.log(error.message);
  }
}
start();
