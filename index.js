const express = require("express");
const cors = require("cors");
const { handleDbConnection } = require("./Connection/connection");
const router = require("./Routes/routes");
const app = express();
const PORT = 8000;
// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Connection
handleDbConnection("mongodb://127.0.0.1:27017/user-data");

// Cors

// Allow requests from your React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/api", router);
app.listen(PORT, () => console.log("Server Connected Successfully Port", PORT));
