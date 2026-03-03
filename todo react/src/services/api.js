const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 모든 할일 조회
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('할일 목록을 가져오는데 실패했습니다.');
    }
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('getTodos error:', error);
    throw error;
  }
};

// 할일 생성
export const createTodo = async (title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '할일 생성에 실패했습니다.');
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('createTodo error:', error);
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '할일 수정에 실패했습니다.');
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('updateTodo error:', error);
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '할일 삭제에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('deleteTodo error:', error);
    throw error;
  }
};
