import axios from 'axios';

export const createTask = (name, priority, due_date) => {
	const body = { name, priority, due_date };
	return axios
		.post(`http://127.0.0.1:1214/task`, body)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getTasks = (taskId) => {
	const url = taskId ? `http://127.0.0.1:1214/tasks/${taskId}` : `http://127.0.0.1:1214/tasks`;
	return axios
		.get(url)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateTask = (taskId, task) => {
	const { name, priority, due_date, task_status } = task;
	const body = { name, priority, due_date, task_status };
	return axios
		.put(`http://127.0.0.1:1214/tasks/${taskId}`, body)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const deleteTask = (taskId) => {
	return axios
		.delete(`http://127.0.0.1:1214/tasks/${taskId}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
