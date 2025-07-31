const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = []; // Almacenamiento en memoria

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

  task.title = title;
  task.description = description;
  task.completed = completed;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
