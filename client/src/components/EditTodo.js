import React, {Fragment, useState, useEffect} from "react";

const EditTodo = ({todo}) => {
	const [description, setDescription] = useState(todo.description);
	const updateTodo = async (e) => {
		e.preventDefault();
		try {
			const body = {description};
			const response = await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
				method: "PUT",
				headers: {"content-type":"application/json"},
				body: JSON.stringify(body)
			})
			window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	}
	return (
		<>
		<button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`} onClick={()=>setDescription(todo.description)}>
		Edit
		</button>

		<div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setDescription(todo.description)}>
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div className="modal-body">
				<input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-warning" data-dismiss="modal" onClick={()=>setDescription(todo.description)}>Close</button>
				<button type="button" className="btn btn-primary" onClick={(e)=>updateTodo(e)}>Save changes</button>
			</div>
			</div>
		</div>
		</div>
		</>
	)
}

export default EditTodo;