import { useState, useEffect } from 'react';
import { getTodos } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할일 목록 불러오기
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError('할일 목록을 불러오는데 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 할일 추가 핸들러
  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // 할일 수정 핸들러
  const handleUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };

  // 할일 삭제 핸들러
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>할일 관리</h1>
          <p className="subtitle">할일을 추가하고 관리하세요</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <TodoList 
            todos={todos} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
