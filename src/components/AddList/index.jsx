import React from 'react'

import Badge from '../Badge/Badge';
import List from '../List';

import closeSvg from "../../assets/img/close.svg"

import "./AddList.scss"
import axios from 'axios';

const AddList = ({ colors, onAdd }) => {
	const [visiblePopup, setVisiblePopup] = React.useState(false)
	const [selectedColor, setSelectedColor] = React.useState(3)
	const [isLoading, setIsLoading] = React.useState(false)
	const [inputValue, setInputValue] = React.useState("")

	React.useEffect(() => {
		if (Array.isArray(colors)) {
			setSelectedColor(colors[0].id)
		}
	}, [colors])

	const onClose = () => {
		setVisiblePopup(false)
		setInputValue("")
		setSelectedColor(colors[0].id)
	}

	const addList = () => {
		if (!inputValue) {
			return
		}
		setIsLoading(true)
		axios.post("http://localhost:3001/lists", {
			id: Math.random(),
			name: inputValue,
			colorId: selectedColor
		}).then(({ data }) => {
			const color = colors.filter(c => c.id === selectedColor)[0]
			const listObj = { ...data, color, tasks: [] }
			onAdd(listObj)
			onClose()
		}).finally(() => {
			setIsLoading(false)
		});
	}

	return (
		<>
			<List
				onClick={() => setVisiblePopup(true)}
				items={[
					{
						className: "list__add-button",
						icon:
							<svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>,
						name: "Добавить список"
					}
				]}
			/>
			{visiblePopup &&
				<div className='list__add-popup'>
					<img
						className='list__popup-close-btn'
						onClick={onClose}
						src={closeSvg}
						alt=""
					/>
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='field'
						type="text"
						placeholder='Название списка'
					/>


					<div className='list__popup-colors'>
						{colors.map((color) => {
							return <Badge key={color.id} onClick={() => setSelectedColor(color.id)} color={color.name} className={selectedColor === color.id && "active"} />
						})}
					</div>
					<button className='button' onClick={addList}>{isLoading ? "Добавление..." : "Добавить список"}</button>
				</div>
			}
		</>
	)
}

export default AddList;