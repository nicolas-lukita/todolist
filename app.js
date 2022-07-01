const path = require("path");
const express = require("express");

const todoRoutes = require("./routers/routers");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//to parse incoming request body
app.use(express.urlencoded({ extended: true }));
//serves static css files
app.use(express.static("public"));

app.use(todoRoutes);

//error handler if routes or middleware fails
app.use((error, req, res, next) => {
	console.log(error);
	res.status(500).render("500");
});

app.listen(3000);
