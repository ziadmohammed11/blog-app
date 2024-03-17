const express = require("express");
const connectToDba = require("./config/connectToDba");
require("dotenv").config();
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");

// Connection To Db
connectToDba();
// Init App
const app = express();
// Middlewares
app.use(express.json());

// Rate Limiting
app.use(rateLimiting({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max:200,
}));

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());


// cors policy
app.use(cors({
  origin: "http://localhost:3000"
}))



// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password",require("./routes/passwordRoute"));



// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);




// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);