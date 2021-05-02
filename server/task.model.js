const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: { type: String, required: true },
	priority: { type: String, enum: [ 'high', 'medium', 'low' ], required: true },
	date_created: { type: Date, default: Date.now },
	due_date: { type: Date, required: true },
	task_status: { type: String, default: 'to do', enum: [ 'to do', 'review', 'completed' ] }
});

module.exports = mongoose.model('Task', TaskSchema);
