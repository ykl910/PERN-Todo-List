import express from 'express';
import cors from 'cors';
import pool from './db.js'

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.listen(5001, ()=>{console.log("server listening on 5001")});

// routes

// create a todo
app.post('/todos', async(req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);
		res.json(newTodo.rows[0])
	}
	catch(err) {
		console.error(err.message);
	}
});

// get all todos
app.get('/todos', async(req, res) => {
	try {
		const allTodo = await pool.query(
			"SELECT * FROM todo"
		);
		res.json(allTodo.rows);
	}
	catch (err) {
		console.error(err.message);
	}
});

// get a todo
app.get('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query(
			"SELECT * FROM todo WHERE todo_id = $1",
			[id]
		);
		res.json(todo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
})


// update a todo
app.put('/todos/description/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const todo = await pool.query(
			"UPDATE TODO SET description = $1 WHERE todo_id = $2",
			[description, id]
		);
		res.json("todo is updated");
	} catch (err) {
		console.error(err.message);
	}
})

// update priority
app.put('/todos/priority/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const { priority } = req.body;
		const todo = await pool.query(
			"UPDATE TODO SET priority = $1 WHERE todo_id = $2",
			[priority, id]
		);
		res.json("todo prior updated");
	} catch (err) {
		console.error(err.message);
	}
})

// update due date
app.put('/todos/dueDate/:id', async(req, res)=>{
	try {
		const { id } = req.params;
		const { dueDate } = req.body;
		const todo = await pool.query(
			"UPDATE TODO SET due_date = $1 WHERE todo_id = $2",
			[dueDate, id]
		);
		res.json("todo due date updated");
	} catch (err) {
		console.error(err.message);
	}
})

// delete a todo
app.delete('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query(
			"DELETE FROM todo WHERE todo_id = $1",
			[id]
		);
		res.json("todo deleted")
	} catch (err) {
		console.error(err.message);
	}
})