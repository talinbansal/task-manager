const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { classifyTask } = require('./nlp/classifier');

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); 
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('tasks.db');

app.post('/tasks', async (req, res) => {
    const [taskID, task, date, time, tag] = req.body;
    console.log(taskID, task, date, time, tag);

    const insertQuery = 'INSERT INTO all_tasks(taskID, task, date, time, tag) VALUES (?, ?, ?, ?, ?)'; 

    db.run(insertQuery, [taskID, task, date, time, tag], function (err) {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to add task' });
        }
        return res.status(201).json({ message: 'Task added successfully' });
    });
});

app.get('/populate_tasks', (req, res) => { 
    const selectQuery = 'SELECT * FROM all_tasks';

    db.all(selectQuery, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
        return res.json(rows);
    });
});

app.post('/update_tasks', (req, res) => { 
    const updatedTask = req.body; 
    console.log(updatedTask);

    const updateQuery = 'UPDATE all_tasks SET task=?, date=?, time=? WHERE taskID = ?';

    db.run(updateQuery, [updatedTask[1], updatedTask[2], updatedTask[3], updatedTask[0]], function(err) {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to update tasks' });
        } 
        if (this.changes === 0) {
            // No rows were updated (task ID not found)
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task updated successfully');
        return res.json({ success: true });
    });
});

app.post('/delete_tasks', (req, res) => { 
    const taskID = req.body.taskID.trim();
    console.log(taskID);

    const deleteQuery = 'DELETE FROM all_tasks WHERE taskID = ?';

    db.run(deleteQuery, [taskID], function(err) {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to delete tasks' });
        } 
        if (this.changes === 0) {
            // No rows were updated (task ID not found)
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task deleted successfully');
        return res.json({ success: true });
    });
});

app.post('/classify', async (req, res) => {
    const text = req.body;
    console.log(text);
    const category = await classifyTask(text);
    console.log(category);
    res.json({ category });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


