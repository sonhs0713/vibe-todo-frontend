import { useState } from 'react';
import { createTodo } from '../services/api';
import './TodoForm.css';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim().length === 0) {
      alert('할일 내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const newTodo = await createTodo(title.trim());
      onAdd(newTodo);
      setTitle('');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새로운 할일을 입력하세요..."
        className="todo-input"
        disabled={isLoading}
      />
      <button type="submit" className="add-btn" disabled={isLoading}>
        {isLoading ? '추가 중...' : '추가'}
      </button>
    </form>
  );
};

export default TodoForm;
