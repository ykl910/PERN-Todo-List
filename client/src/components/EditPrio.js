import React, {Fragment, useEffect, useState} from "react";

const EditPrio = ({todo}) => {
	const [priority, setPriority] = useState(todo.priority);
	// const updatePrio = async (e) => {
	// 	const newPrio = e.target.value;
	// 	setPriority(newPrio);
	// 	try {
	// 		const body = {priority : newPrio};
	// 		const response = await fetch(`http://localhost:5001/todos/priority/${todo.todo_id}`, {
	// 			method: "PUT",
	// 			headers: {"Content-Type" : "application/json"},
	// 			body: JSON.stringify(body)
	// 		})
	// 		window.location = "/"
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}		
	// }
	useEffect(
		() => {
			if (priority === todo.priority) return;
			const updatePrio = async () => {
				try {
					const body = {priority};
					const response = await fetch(`http://localhost:5001/todos/priority/${todo.todo_id}`, {
						method: "PUT",
						headers: {"Content-Type" : "application/json"},
						body: JSON.stringify(body)
					})
					window.location = "/"
				} catch (err) {
					console.error(err.message);
				}
			}
			updatePrio();			
		}
		, [priority]
	)
	const getColor = (prio) => {
		switch (prio) {
			case "Prio 1":
				return "red";
			case "Prio 2":
				return "orange";
			case "Prio 3":
				return "green";
			default:
				return "gray"
		}
	}

	return (
		<>
			{/* <select className="form-select" value={todo.priority} onChange={(e)=>updatePrio(e)}> */}
			<select className="form-select" value={priority} onChange={(e)=>setPriority(e.target.value)} style={{backgroundColor:getColor(priority), color:"white"}}>

				<option value="unknown">unknown</option>
				<option value="Prio 1">Prio 1</option>
				<option value="Prio 2">Prio 2</option>
				<option value="Prio 3">Prio 3</option>
			</select>
		</>
	)
}

export default EditPrio;