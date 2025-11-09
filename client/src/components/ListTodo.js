import React, { useEffect, useState, Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {

	const [todos, setTodos] = useState([]);
	const getTodos = async() => {
		try {
			const response = await fetch("http://localhost:5001/todos");
			const jsonData = await response.json();
			setTodos(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	}
	const deleteTodo = async(key) => {

		try {
			const response = await fetch(`http://localhost:5001/todos/${key}`, {
				method: "DELETE"
			})
			console.log(response);
			window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	}
	useEffect(() => {
		getTodos();
	}, [])
	return (
		<>
		<table className="table mt-5 text-center">
		<thead>
			<tr>
			<th scope="col">Description</th>
			<th scope="col">Edit</th>
			<th scope="col">Delete</th>
			</tr>
		</thead>
		<tbody>
			{todos.map(todo => (
				<tr key = {todo.todo_id}>
					<td>
						{todo.description}
					</td>
					<td><EditTodo todo={todo}/></td>
					<td>
						<button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
					</td>
				</tr>
			))}
		</tbody>
		</table>
		</>
	)
}

export default ListTodo;