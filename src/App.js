import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // меняется только когда меняется tasks

  // Добавить задачу
  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  // Удалить задачу
  const deleteTask = (index) => {
    const deleteLiTasks = tasks.filter((_, i) => i !== index);
    setTasks(deleteLiTasks);
  };

  // Отметить как выполненное/не выполненное
  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <nav>
        <div className="logo">TODO LIST</div>
      </nav>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите задачу..."
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
