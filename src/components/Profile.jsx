import { useState, useEffect } from 'react'
import { FiUser, FiMoon, FiSun, FiEdit2, FiPlus } from 'react-icons/fi'

const Profile = ({ onAddProject }) => {
  const [greeting, setGreeting] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [userName, setUserName] = useState(() => {
    // username dari localStorage
    return localStorage.getItem('userName') || 'Guest'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(userName)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setTempName(userName)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (tempName.trim()) {
      setUserName(tempName)
      localStorage.setItem('userName', tempName)
      setIsEditing(false)
    }
  }

  const handleNameCancel = () => {
    setIsEditing(false)
    setTempName(userName)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="user-info">
            <div className="avatar">
              <FiUser className="avatar-icon" />
            </div>
            <div className="user-details">
              <h2 className="greeting">{greeting},</h2>
              {isEditing ? (
                <form onSubmit={handleNameSubmit} className="edit-name-form">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="name-input"
                    autoFocus
                    maxLength={30}
                    placeholder="Enter your name"
                  />
                  <div className="edit-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={handleNameCancel} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="name-display">
                  <h1 className="user-name">{userName}</h1>
                  <button onClick={handleEditClick} className="edit-btn">
                    <FiEdit2 />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="current-date">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="profile-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button className="add-project-btn" onClick={onAddProject}>
            <FiPlus />
            <span>Add New Task</span>
          </button>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">
            {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
          </span>
          <span className="stat-label">Current Time</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">28h</span>
          <span className="stat-label">Tracked Time</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">18</span>
          <span className="stat-label">Tasks Done</span>
        </div>
      </div>
    </div>
  )
}

export default Profile