import axios from 'axios'
import React from 'react'

import addSvg from "../../assets/img/add.svg"


export const AddTaskForm = ({ list, onAddTask }) => {
	const [visibleForm, setVisibleForm] = React.useState(false)
	const [inputValue, setInputValue] = React.useState("")
	const [isLoading, setIsLoading] = React.useState(false)

	const toggleFormVisible = () => {
		setVisibleForm(!visibleForm)
		setInputValue("")
	}

	const addTask = () => {
		const obj = {
			listId: list.id,
			text: inputValue,
			completed: false
		};
		setIsLoading(true)
		axios.post("http://localhost:3001/tasks", obj)
			.then(({ data }) => {
				onAddTask(list.id, data)
				toggleFormVisible()
			})
			.catch(() => alert("Ошибка"))
			.finally(() => setIsLoading(false))
	}
	return (
		<div className="tasks__form">
			{!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
				<img src={addSvg} alt="add icon" />
				<span>Новая задача</span>
			</div>
				:
				<>
					<div className="tasks__form-block">
						<input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className='field'
							type="text"
							placeholder='Название списка'
						/>
						<button disabled={isLoading} onClick={addTask} className='button'>
							{isLoading ? "Добавление..." : "Добавить задачу"}
						</button>
						<button onClick={toggleFormVisible} className='button button--grey'>
							Отмена
						</button>
					</div>
				</>
			}


		</div>
	)
}
