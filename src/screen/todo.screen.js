import React, { useEffect, useState } from 'react';
import {
	Button,
	TextField,
	Box,
	Container,
	Paper,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import { FormDialog } from '../components/task.dialog';
import { Edit, Delete } from '@material-ui/icons';
import { getTasks, createTask, deleteTask } from '../service/task.service';

export default function Todo() {
	const [ tasks, setTasks ] = useState([]);
	const [ task, setTask ] = useState('');
	const [ priority, setPriority ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ date, setDate ] = useState('');
	const [ modalOpen, setModalOpen ] = useState(false);
	const [ data, setData ] = useState(null);

	useEffect(
		() => {
			getTasks()
				.then((data) => {
					setTasks(data);
				})
				.catch((err) => console.log(err));
		},
		[ tasks ]
	);

	const styles = {
		high: {
			backgroundColor: '#ffcccb',
			width: '60%',
			alignItems: 'center'
		},
		medium: {
			backgroundColor: '#ffffed',
			width: '60%',
			alignItems: 'center'
		},
		low: {
			backgroundColor: '#CBF9CB',
			width: '60%',
			alignItems: 'center'
		}
	};

	const handleChange = (event) => {
		setPriority(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleModalOpen = (taskId) => {
		getTasks(taskId).then((data) => {
			if (data) {
				setData(data);
			} else {
				alert('something went wrong');
			}
		});
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleClick = () => {
		if (!task || !priority || !date) {
			alert('enter correct data');
			return;
		}
		createTask(task, priority, date)
			.then((data) => {
				if (data) {
					alert('data successfully appended');
				} else {
					alert('something went wrong, try again');
				}
			})
			.catch((err) => console.log(err));
	};

	const handleDelete = (taskId) => {
		deleteTask(taskId)
			.then((data) => {
				if (data) {
					alert(data.message);
				} else {
					alert('something went wrong');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container style={{ width: '100%', height: '100%' }}>
			<Box display="flex" p={1} my={2}>
				<Box px={2} py={1} width="40%" display="flex" bgcolor="grey.300">
					<Box p={1}>
						<TextField
							onChange={(event) => {
								setTask(event.target.value);
							}}
							value={task}
							placeholder={'Enter a task name'}
							label="Task Name"
							variant="outlined"
						/>
					</Box>

					<Box p={1}>
						<FormControl px={1} styles={{ minWidth: '128px' }}>
							<InputLabel id="priority">Priority</InputLabel>
							<Select
								style={{ paddingLeft: '45px' }}
								labelId="priority"
								id="select-priority"
								open={open}
								onClose={handleClose}
								onOpen={handleOpen}
								value={priority}
								onChange={handleChange}
							>
								<MenuItem value="None">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'high'}>High</MenuItem>
								<MenuItem value={'low'}>Low</MenuItem>
								<MenuItem value={'medium'}>Medium</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box p={1}>
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
								setDate(event.target.value);
							}}
						/>
					</Box>
				</Box>
				<Box p={1} flexShrink={1}>
					<Button onClick={handleClick} variant="contained" color="primary">
						Add Task
					</Button>
				</Box>
			</Box>
			{tasks &&
				tasks.map((item, index) => {
					return (
						<Box key={index} p={1} alignItems="center">
							<Paper elevation={5} style={styles[item.priority]}>
								<Box display="flex" p={1}>
									<Box width="100%" display="flex" alignItems="center">
										<Box>{item.name}</Box>
									</Box>
									<Box flexShrink={0} display="flex" alignItems="center">
										{item.task_status[0].toUpperCase() + item.task_status.slice(1)}
									</Box>
									<Box flexShrink={1}>
										<IconButton
											key={index}
											aria-label="edit"
											onClick={() => handleModalOpen(item._id)}
										>
											<Edit />
										</IconButton>
									</Box>
									<FormDialog open={modalOpen} handleClose={handleModalClose} task={data} />
									<Box flexShrink={1}>
										<IconButton onClick={() => handleDelete(item._id)} aria-label="edit">
											<Delete />
										</IconButton>
									</Box>
								</Box>
							</Paper>
						</Box>
					);
				})}
		</Container>
	);
}
