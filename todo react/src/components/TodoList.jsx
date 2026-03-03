import { useState } from 'react';
import { updateTodo, deleteTodo } from '../services/api';
import './TodoList.css';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const handleSave = async (id) => {
    if (editTitle.trim().length === 0) {
      alert('할일 내용을 입력해주세요.');
      return;
    }

    try {
      const updatedTodo = await updateTodo(id, { title: editTitle });
      onUpdate(updatedTodo);
      setEditingId(null);
      setEditTitle('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = await updateTodo(todo._id, { completed: !todo.completed });
      onUpdate(updatedTodo);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTodo(id);
      onDelete(id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty-message">할일이 없습니다. 새로운 할일을 추가해보세요!</div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo._id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSave(todo._id);
                    if (e.key === 'Escape') handleCancel();
                  }}
                  className="edit-input"
                  autoFocus
                />
                <div className="edit-buttons">
                  <button onClick={() => handleSave(todo._id)} className="save-btn">저장</button>
                  <button onClick={handleCancel} className="cancel-btn">취소</button>
                </div>
              </div>
            ) : (
              <>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => handleToggleComplete(todo)}
                    className="todo-checkbox"
                  />
                  <span className="todo-title">{todo.title}</span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)} className="edit-btn">수정</button>
                  <button onClick={() => handleDelete(todo._id)} className="delete-btn">삭제</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
