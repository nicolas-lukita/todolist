const express = require("express");

const router = express.Router();

const db = require("../data/database");

router.get("/", (req, res) => {
	res.redirect("/todos");
});

router.get("/todos", async (req, res) => {
	const query = `SELECT todos.*, levels.level FROM todos INNER JOIN levels ON todos.level_id = levels.id`;
	const [todoItems] = await db.query(query);
	res.render("todo-lists", { todoItems: todoItems });
});

router.get("/create-todo", async (req, res) => {
	const query = `SELECT * FROM levels`;
	const [levels] = await db.query(query);
	res.render("create-todo", { levels: levels });
});

router.post("/todos", async (req, res) => {
	const input = [req.body.todo, req.body.details, req.body.level];
	const query = `INSERT INTO todos (todo, details, level_id) VALUES (?)`;
	await db.query(query, [input]);
	res.redirect("/");
});

router.get("/todos/:todoId/edit", async (req, res) => {
	const todoId = req.params.todoId;
	const query = `SELECT * FROM todos WHERE todos.id = ?`;
	const [todoItem] = await db.query(query, [todoId]);
	const query2 = `SELECT * FROM levels`;
	const [levels] = await db.query(query2);
	res.render("edit-todo", { todo: todoItem[0], levels: levels });
});

router.post("/todos/:todoId/edit", async (req, res) => {
	const todoId = req.params.todoId;
	const formData = [req.body.todo, req.body.details, req.body.level];
	const query = `UPDATE todos SET todo = ?, details = ?, level_id = ? WHERE id = ?`;
	await db.query(query, [formData[0], formData[1], formData[2], todoId]);
	res.redirect("/");
});

router.post("/todos/:todoId/delete", async (req, res) => {
	const todoId = req.params.todoId;
	const query = `DELETE FROM todos WHERE id = ?`;
	await db.query(query, [todoId]);
	res.redirect("/");
});

module.exports = router;
