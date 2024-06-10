import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

function TodoListItem({ label, editItem, deleteItem, onToggleDone, done, timerRunning, startTimer, pauseTimer, formatTime }) {
  const [editedText, setEditedText] = useState(label)
  const [isEditing, setIsEditing] = useState(false)
  const [createdAt] = useState(new Date())
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(createdAt))
  
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(formatDistanceToNow(createdAt))
    }, 60000) 

    return () => clearInterval(timer)
  }, [createdAt])

  const handleEdit = () => {
    setIsEditing(prevIsEditing => !prevIsEditing)
  }

  const handleInputChange = (e) => {
    setEditedText(e.target.value)
  }

  const handleSave = () => {
    editItem(editedText)
    setIsEditing(false)
  }

  const handleBlur = () => {
    if (isEditing) {
      setIsEditing(false)
    }
  }

  return (
    <div className="view">
      {isEditing ? (
        <input
          ref={inputRef}
          className="edit-input"
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave()
            } else if (e.key === 'Escape') {
              setIsEditing(false)
            }
          }}
        />
      ) : (
        <>
          <input className="toggle" type="checkbox" onChange={onToggleDone} onClick={pauseTimer}/>
          <label htmlFor="inputElement" className={done ? 'label done' : 'label'}>
            <span>{label}</span>
            <span className="created">
              <button type="button" className="icon icon-play" onClick={startTimer} disabled={timerRunning} />
              <button type="button" className="icon icon-pause" onClick={pauseTimer} disabled={!timerRunning} />
              <span className="time">{formatTime()}</span>
            </span>
            <span className="created">created {timeAgo} ago</span>
          </label>
        </>
      )}
      <button type="button" className="icon icon-edit" onClick={handleEdit} />
      <button type="button" className="icon icon-destroy" onClick={deleteItem} />
    </div>
  )
}

export default TodoListItem