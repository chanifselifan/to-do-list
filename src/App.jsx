import { useState } from 'react'
import Profile from './components/Profile'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo])
  }

  const handleDeleteAll = () => {
    setTodos([])
  }

  const handleToggleStatus = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, isDone: !todo.isDone} : todo
    ))
  }

  return (
    <div className="app-container">
      <Profile onAddProject={() => setIsFormOpen(true)} />
      <TodoForm 
        onAddTodo={handleAddTodo} 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      <TodoList 
        todos={todos} 
        onToggleStatus={handleToggleStatus}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  )
}

export default App