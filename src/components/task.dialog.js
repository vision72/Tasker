import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Edit } from '@material-ui/icons';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { updateTask } from '../service/task.service';

export const FormDialog = ({ open, handleClose, task }) => {
	const [ name, setName ] = useState('');
	const [ date, setDate ] = useState('');
	const [ priority, setPriority ] = useState('');
	const [ status, setStatus ] = useState('');
	const [ openPriority, setOpen ] = useState(false);
	const [ openStatus, setOpenStatus ] = useState(false);

	// const updateThisTask = (thisTask) => {
	// 	const date = new Date(thisTask.due_date);
	// 	setName(thisTask.name);
	// 	setPriority(thisTask.priority);
	// 	setDate(
	// 		`${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getDate()}`
	// 	);
	// 	setStatus(thisTask.task_status);
	// };

	useEffect(
		() => {
			if (task) {
				console.log(task.due_date.slice(0, 10));
				setName(task.name);
				setPriority(task.priority);
				// setDate(
				// 	`${date.getFullYear()}-${date.getMonth() < 10
				// 		? '0' + date.getMonth()
				// 		: date.getMonth()}-${date.getDate()}`
				// );
				setDate(task.due_date.slice(0, 10));
				setStatus(task.task_status);
			}
		},
		[ task ]
	);

	const handleChange = (event) => {
		setPriority(event.target.value);
	};

	const handlePriorityClose = () => {
		setOpen(false);
	};

	const handlePriorityOpen = () => {
		setOpen(true);
	};

	const handleChangeStatus = (event) => {
		setStatus(event.target.value);
	};

	const handleStatusClose = () => {
		setOpenStatus(false);
	};

	const handleStatusOpen = () => {
		setOpenStatus(true);
	};

	const handleUpdate = (id) => {
		const due_date = date;
		const task_status = status;
		const task = { name, priority, due_date, task_status };
		updateTask(id, task)
			.then((data) => {
				if (data) {
					setName(data.name);
					setPriority(data.priority);
					setDate(task.due_date.slice(0, 10));
					setStatus(data.task_status);
				} else alert('something went wrong, try again...');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">
				Edit Task <Edit />
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To edit a task, please change the values here. We will send updates automatically.
				</DialogContentText>

				<TextField
					autoFocus
					margin="dense"
					label="Task Name"
					type="email"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>

				<Box style={{ marginTop: '20px' }}>
					<FormControl px={1} styles={{ minWidth: '128px' }}>
						<InputLabel id="priority">Priority</InputLabel>
						<Select
							p={5}
							labelId="priority"
							id="select-priority"
							open={openPriority}
							onClose={handlePriorityClose}
							onOpen={handlePriorityOpen}
							value={priority}
							onChange={handleChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'high'}>High</MenuItem>
							<MenuItem value={'low'}>Low</MenuItem>
							<MenuItem value={'medium'}>Medium</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box style={{ marginTop: '20px' }}>
					<TextField
						id="date"
						label="Due Date"
						type="date"
						style={{ width: '200' }}
						InputLabelProps={{
							shrink: true
						}}
						value={date}
						onChange={(event) => {
							console.log('Handle Change', event.target.value);
							setDate(event.target.value);
						}}
					/>
				</Box>

				<FormControl style={{ marginTop: '20px' }}>
					<InputLabel id="priority">Task Status</InputLabel>
					<Select
						style={{ paddingTop: '20px', paddingLeft: '20px' }}
						labelId="priority"
						id="select-priority"
						open={openStatus}
						onClose={handleStatusClose}
						onOpen={handleStatusOpen}
						value={status}
						onChange={handleChangeStatus}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'to do'}>To do</MenuItem>
						<MenuItem value={'review'}>Review</MenuItem>
						<MenuItem value={'completed'}>Completed</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={() => handleUpdate(task._id)} color="primary">
					Update Task
				</Button>
			</DialogActions>
		</Dialog>
	);
};
