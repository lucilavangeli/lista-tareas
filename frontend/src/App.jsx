import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de Tareas</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Inicio</Link> | <Link to="/create">Crear tarea</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;

