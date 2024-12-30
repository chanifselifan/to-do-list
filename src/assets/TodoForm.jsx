import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTodo({
      text: text,
      completed: false,
      createdAt: new Date()
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task"
        className="todo-input"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm; 