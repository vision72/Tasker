module.exports = (app) => {
	const tasks = require('./task.controller.js');

	// create a new task
	app.post('/task', tasks.create);

	// retrieve all the tasks
	app.get('/tasks', tasks.findAll);

	// retrieve a single task
	app.get('/tasks/:taskId', tasks.findOne);

	// update a task with taskId
	app.put('/tasks/:taskId', tasks.update);

	// delete a task with taskId
	app.delete('/tasks/:taskId', tasks.delete);
};
