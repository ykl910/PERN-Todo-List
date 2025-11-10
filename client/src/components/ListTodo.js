import React, { useEffect, useState, Fragment } from "react";
import EditTodo from "./EditTodo";
import EditPrio from "./EditPrio";
import EditDueDate from "./EditDueDate";

const ListTodo = () => {

	const [todos, setTodos] = useState([]);
	const [sortTodos, setSortTodos] = useState([]);

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
	const priorityOrder = {
		"Prio 1": 1,
		"Prio 2": 2,
		"Prio 3": 3,
		"unknown": 4,
	};
	useEffect(() => {
		getTodos();
	}, [])
	useEffect(() => {
		const sorted =	[...todos].sort((a,b)=>{
			return priorityOrder[a.priority] - priorityOrder[b.priority]
		})
		setSortTodos(sorted);
	}, [todos])
	return (
		<>
		<table className="table mt-5 text-center">
		<thead>
			<tr>
			<th scope="col">Description</th>
			<th scope="col">Priority</th>
			<th scope="col">Edit</th>
			<th scope="col">Delete</th>
			<th scope="col">Due Date</th>
			</tr>
		</thead>
		<tbody>
			{sortTodos.map(todo => (
				<tr key = {todo.todo_id}>
					<td>
						{todo.description}
					</td>
					<td><EditPrio todo={todo} /></td>
					<td><EditTodo todo={todo}/></td>
					<td>
						<button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
					</td>
					<td><EditDueDate todo={todo}/></td>
				</tr>
			))}
		</tbody>
		</table>
		</>
	)
}

export default ListTodo;