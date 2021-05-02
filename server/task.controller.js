const Task = require('./task.model');

// create and save a new task
exports.create = (req, res) => {
	// validate request
	if (!req.body.name) {
		return res.status(400).send({
			message: 'Task content can not be empty'
		});
	}

	// creating a lowercase copy
	const priority = req.body.priority.toLowerCase();

	// create a task
	const task = new Task({
		name: req.body.name || 'Untitled Task',
		priority: priority,
		due_date: req.body.due_date
	});

	// save task in the database
	task
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the task'
			});
		});
};

// retrieve and return all tasks from the database
exports.findAll = (req, res) => {
	Task.find()
		.then((tasks) => {
			res.send(tasks);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tasks.'
			});
		});
};

// find a single task with taskId
exports.findOne = (req, res) => {
	console.log();
	Task.findById(req.params.taskId)
		.then((task) => {
			if (!task) {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			res.send(task);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			return res.status(500).send({
				message: `Error retrieving task with id ${req.params.taskId}`
			});
		});
};

// update a task identified by the taskId in the request
exports.update = (req, res) => {
	// validate request
	if (!req.body.name) {
		return res.status(400).send({
			message: 'Task content can not be empty'
		});
	}

	// creating a lowercase copies of the two
	const priority = req.body.priority.toLowerCase();
	const task_status = req.body.task_status.toLowerCase() || 'to do';

	Task.findByIdAndUpdate(
		req.params.taskId,
		{
			name: req.body.name || 'Untitled task',
			priority: priority,
			due_date: req.body.due_date,
			task_status: task_status
		},
		{ new: true }
	)
		.then((task) => {
			if (!task) {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			res.send(task);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			return res.status(500).send({
				message: `Error retrieving task with id ${req.params.taskId}`
			});
		});
};

// delete a task with the specified taskId in the request
exports.delete = (req, res) => {
	Task.findByIdAndRemove(req.params.taskId)
		.then((task) => {
			if (!task) {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			res.send({ message: 'Task deleted successfully' });
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: `Task not found with id ${req.params.taskId}`
				});
			}
			return res.status(500).send({
				message: `Could not delete task with id ${req.params.taskId}`
			});
		});
};
