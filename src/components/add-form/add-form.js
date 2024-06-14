import React, { useState, useEffect, useRef } from 'react'
import './add-form.css'

function AddForm({ addItem }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const taskInputRef = useRef(null)

  useEffect(() => {
    taskInputRef.current.focus()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'task') {
      setLabel(value)
    }
  }

  const handleTimeChange = (e) => {
    const { name, value } = e.target
    if (name === 'minutes' && /^\d*$/.test(value)) {
      setMinutes(value)
    } else if (name === 'seconds' && /^\d*$/.test(value) && value <= 59 && value.length <= 2) {
      setSeconds(value)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && label.trim() !== '' && minutes !== '' && seconds !== '') {
      addItem(label, minutes, seconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form className="new-todo-form">
      <input
        ref={taskInputRef}
        className="new-todo"
        name="task"
        placeholder="Task"
        value={label}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        placeholder="Min"
        value={minutes}
        onChange={handleTimeChange}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        placeholder="Sec"
        value={seconds}
        onChange={handleTimeChange}
        onKeyPress={handleKeyPress}
      />
    </form>
  )
}

export default AddForm
