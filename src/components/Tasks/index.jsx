import React from 'react'
import axios from 'axios'

import editSvg from '../../assets/img/edit.svg'

import { AddTaskForm } from './AddTaskForm'
import Task from './Task'

import "./Tasks.scss"

function Tasks({
	list,
	onEditTitle,
	onAddTask,
	withoutEmpty,
	onRemoveTask,
	onEditTask,
	onCompleteTask
}) {
	const editTitle = () => {
		const newTitle = prompt("Название списка", list.title)
		if (newTitle) {
			onEditTitle(list.id, newTitle)
			axios.patch("http://localhost:3001/lists/" + list.id, {
				name: newTitle
			}).catch(() => {
				alert("Не удалось отловить название списка")
			})
		}
	}



	return (
		<div>
			<div className="tasks">
				<h2 style={{ color: list.color.hex }} className="tasks__title">
					{list.name}
					<img src={editSvg} alt="Edit icon" onClick={editTitle} />
				</h2>
				<div className="tasks__items">
					{!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
					{list.tasks && list.tasks.map((task, index) => (
						<Task key={task.id} onComplete={onCompleteTask} list={list} onEdit={onEditTask} onRemove={onRemoveTask} {...task} />
					))}
					<AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
				</div>
			</div>
		</div>
	)
}

export default Tasks