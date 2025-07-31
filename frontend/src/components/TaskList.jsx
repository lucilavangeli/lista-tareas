import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><b>Estado:</b> {task.completed ? 'Completada' : 'Pendiente'}</p>
          <Link to={`/edit/${task.id}`}>Editar</Link> |
          <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '1rem' }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
