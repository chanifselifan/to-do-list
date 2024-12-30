import React from 'react';
import { FaTrash } from 'react-icons/fa';

function TodoList({ todos, toggleTodo, deleteTodos, deleteTodo }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const groupedTodos = todos.reduce((groups, todo) => {
    const date = formatDate(todo.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  return (
    <div className="todo-list">
      {Object.entries(groupedTodos).map(([date, dateTodos]) => (
        <div key={date}>
          <div className="date-label">Date: {date}</div>
          {dateTodos.map((todo, index) => (
            <div 
              key={index}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
              </div>
              <FaTrash 
                className="delete-icon"
                onClick={() => deleteTodo(index)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TodoList; 