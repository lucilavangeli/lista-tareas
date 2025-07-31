import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/tasks`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(t => t.id === id);
          if (found) setTask(found);
        });
    }
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = id ? `http://localhost:3000/api/tasks/${id}` : `http://localhost:3000/api/tasks`;
    const method = id ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <label>
        Título:
        <input name="title" value={task.title} onChange={handleChange} required />
      </label>

      <label>
        Descripción:
        <textarea name="description" value={task.description} onChange={handleChange} required />
      </label>

      <label>
        <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} />
        Completada
      </label>

      <button type="submit">{id ? 'Actualizar' : 'Crear'} tarea</button>
    </form>
  );
}

export default TaskForm;
