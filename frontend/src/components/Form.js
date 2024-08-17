import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const FormContainer = styled.form`
	display: flex;
	align-items: flex-end;
	gap: 10px;
	flex-wrap: wrap;
	background-color: #fff;
	padding: 20px;
	box-shadow: 0px 0px 5px #ccc;
	border-radius: 5px;
`

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
`

const Input = styled.input`
	width: 120px;
	padding: 0 10px;
	border: 1px solid #bbb;
	border-radius: 5px;
	height: 40px;
`

const Label = styled.label``

const Button = styled.button`
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	border: none;
	background-color: #2c73d2;
	color: white;
	height: 42px;
`

const Form = ({ getIssues, onEdit, setOnEdit }) => {
	const ref = useRef()

	useEffect(() => {
		if (onEdit) {
			const issue = ref.current

			issue.title.value = onEdit.title
			issue.description.value = onEdit.description
		}
	}, [onEdit])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const issue = ref.current

		if (!issue.title.value || !issue.description.value) return toast.warn('Please fill all fields!')

		if (onEdit) {
			await axios
				.put('http://localhost:8800/' + onEdit.id, {
					title: issue.title.value,
					description: issue.description.value,
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data))
		} else {
			await axios
				.post('http://localhost:8800', {
					title: issue.title.value,
					description: issue.description.value,
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data))
		}

		issue.title.value = ''
		issue.description.value = ''

		setOnEdit(null)
		getIssues()
	}

	return (
		<FormContainer ref={ref} onSubmit={handleSubmit}>
			<InputArea>
				<Label>Title</Label>
				<Input name='title' />
			</InputArea>
			<InputArea>
				<Label>Description</Label>
				<Input name='description' />
			</InputArea>
			<Button type='submit'>SAVE</Button>
		</FormContainer>
	)
}

export default Form
