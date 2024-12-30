import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { FiClock, FiFlag, FiX } from 'react-icons/fi'
import "react-datepicker/dist/react-datepicker.css"

const TodoForm = ({ onAddTodo, isOpen, onClose }) => {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('low')
  const [dueDate, setDueDate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim() || !dueDate) return

    const newTodo = {
      id: Date.now(),
      task,
      priority,
      isDone: false,
      createdAt: new Date(),
      dueDate: dueDate,
      isOverdue: false
    }

    onAddTodo(newTodo)
    setTask('')
    setPriority('low')
    setDueDate(null)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#00B894' },
    { value: 'medium', label: 'Medium', color: '#FDCB6E' },
    { value: 'high', label: 'High', color: '#FF4757' }
  ]

  return (
    <div className="modern-form-container">
      <form onSubmit={handleSubmit} className="modern-todo-form">
        <div className="form-header">
          <h3>Create New Task</h3>
          <button 
            type="button" 
            className="close-button"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <div className="form-content">
          <div className="input-group">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              required
              autoFocus
              className="modern-input"
            />
          </div>

          <div className="form-controls">
            <div className="control-group">
              <FiClock className="control-icon" />
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Set due date"
                className="modern-datepicker"
                required
              />
            </div>

            <div className="control-group">
              <FiFlag className="control-icon" />
              <div className="priority-selector">
                {priorityOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    className={`priority-button ${priority === option.value ? 'active' : ''}`}
                    style={{ 
                      '--priority-color': option.color,
                      '--priority-bg': `${option.color}15`
                    }}
                    onClick={() => setPriority(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm