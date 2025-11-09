import React, { Fragment, useState} from "react";

const InputTodo = () => {

	const [description, setDescription] = useState("");
	const onSubmit = async e => {
		e.preventDefault();
		try {
			const body = {description};
			const response = await fetch('http://localhost:5001/todos', {
				method: "POST",
				headers: {"content-type": "application/json"},
				body: JSON.stringify(body)
			});
			window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	}
	return (
		<>
			<h1 className="text-center mt-5">Baby Theophile's todo list</h1>
			<form className="d-flex mg-5" onSubmit={onSubmit}>
				<input
				type="text"
				className="form-control"
				value={(description)}
				onChange={(e => setDescription(e.target.value))}
				></input>
				<button className="btn btn-success">Add</button>
			</form>
		</>
	
	)
}

export default InputTodo;