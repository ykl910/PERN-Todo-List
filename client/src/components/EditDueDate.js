import React, { Fragment,useEffect,useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditDueDate = ({todo}) => {
  const [dueDate, setDueDate] = useState(
	  todo.due_date
	);
  useEffect(()=>{
	if (dueDate === todo.due_date) return;
	const updateDueDate = async () => {
		try {
			
			const body = { dueDate };
			const response = await fetch (`http://localhost:5001/todos/dueDate/${todo.todo_id}`,{
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			})
			console.log(dueDate);
		} catch (err) {
			console.error(err.message);
		}
	};
	updateDueDate();
  },[dueDate])
  return <DatePicker className="my-datepicker" selected={dueDate} onChange={(date) => setDueDate(date)} />;
};

export default EditDueDate;