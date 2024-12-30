import { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

const TodoList = ({ todos, onToggleStatus, onDeleteAll }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update waktu setiap detik untuk mengecek overdue
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      checkOverdueTasks()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const checkOverdueTasks = () => {
    const overdueTasks = activeTodos.filter(todo => isOverdue(todo.dueDate))
    if (overdueTasks.length > 0) {
      // Jika ada task yang baru saja overdue, tampilkan notifikasi
      overdueTasks.forEach(todo => {
        if (!todo.notified) {
          showNotification(todo)
          todo.notified = true // Tandai bahwa notifikasi sudah ditampilkan
        }
      })
    }
  }

  const showNotification = (todo) => {
    // Cek apakah browser mendukung notifikasi
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Task Overdue!", {
          body: `Task "${todo.task}" telah melewati batas waktu`,
          icon: "/path/to/icon.png" // Optional: tambahkan icon untuk notifikasi
        })
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            showNotification(todo)
          }
        })
      }
    }
  }

  const activeTodos = todos.filter(todo => !todo.isDone)
  const completedTodos = todos.filter(todo => todo.isDone)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = (dueDate) => {
    return currentTime > new Date(dueDate)
  }

  const getTimeRemaining = (dueDate) => {
    const remaining = new Date(dueDate) - currentTime
    if (remaining < 0) return 'Overdue'
    
    const minutes = Math.floor(remaining / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} hari tersisa`
    if (hours > 0) return `${hours} jam tersisa`
    if (minutes > 0) return `${minutes} menit tersisa`
    return 'Kurang dari 1 menit'
  }

  const PriorityBadge = ({ priority }) => (
    <span className={`priority-badge ${priority}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )

  return (
    <div className="todo-container">
      {/* Active Todos Section */}
      <div className="todo-section">
        <div className="todo-header">
          <h2>Tasks</h2>
          {todos.length > 0 && (
            <button onClick={onDeleteAll} className="todo-delete">
              Clear All
            </button>
          )}
        </div>

        <div className="todo-list">
          {activeTodos.map(todo => (
            <div 
              key={todo.id} 
              className={`todo-item ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}
              data-priority={todo.priority}
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => onToggleStatus(todo.id)}
                className="todo-checkbox"
              />
              <div className="todo-content">
                <span className="todo-text">{todo.task}</span>
                <div className="todo-meta">
                  <PriorityBadge priority={todo.priority} />
                  <span className="todo-date">Due: {formatDate(todo.dueDate)}</span>
                  <span className="time-remaining">
                    {getTimeRemaining(todo.dueDate)}
                  </span>
                  {isOverdue(todo.dueDate) && 
                    <span className="overdue-badge">Overdue!</span>
                  }
                </div>
              </div>
              <div className="todo-actions">
                <button className="todo-delete">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Todos Section */}
      {completedTodos.length > 0 && (
        <div className="todo-section completed-section">
          <div className="todo-header">
            <h2>Done</h2>
          </div>

          <div className="todo-list">
            {completedTodos.map(todo => (
              <div 
                key={todo.id} 
                className="todo-item completed"
                data-priority={todo.priority}
              >
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => onToggleStatus(todo.id)}
                  className="todo-checkbox"
                />
                <div className="todo-content">
                  <span className="todo-text">{todo.task}</span>
                  <PriorityBadge priority={todo.priority} />
                </div>
                <div className="todo-actions">
                  <button className="todo-delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList