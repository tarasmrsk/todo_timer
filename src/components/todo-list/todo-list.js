import React, { useState, useEffect } from 'react'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

function TodoList({ todos, onToggleDone, toggleEditMode, editItem, deleteItem }) {
  const [timers, setTimers] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = {}
        Object.keys(prevTimers).forEach(key => {
          if (prevTimers[key].isRunning) {
            const timer = prevTimers[key]
            if (timer && timer.time !== undefined) {
              updatedTimers[key] = {
                time: timer.time + 1,
                isRunning: true
              }
            } else {
              updatedTimers[key] = prevTimers[key]
            }
          } else {
            updatedTimers[key] = prevTimers[key]
          }
        })
        return updatedTimers
      })
    }, 1000)
  
    return () => clearInterval(interval)
  }, [])

  const handleStart = (id) => {
    setTimers(prevTimers => {
      const prevTimer = prevTimers[id]
      const newTime = prevTimer ? prevTimer.time : 0
      return {
        ...prevTimers,
        [id]: { time: newTime, isRunning: true }
      }
    })
  }

  const handleStop = (id) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: { ...prevTimers[id], isRunning: false }
    }))
  }

  const formatTime = (id) => {
    const timer = timers[id]
    if (timer && timer.time !== undefined) {
      const { time } = timer
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      return `${(minutes < 10 ? '0' : '') + minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return '00:00'
  }

  const elements = todos.map((item) => {
    const { id, label, done } = item

    return (
      <li key={id}>
        <TodoListItem
          id={id}
          label={label}
          done={done}
          onToggleDone={() => onToggleDone(id)}
          toggleEditMode={() => toggleEditMode(id)}
          editItem={(newText) => editItem(id, newText)}
          deleteItem={() => deleteItem(id)}
          timerRunning={timers[id] ? timers[id].isRunning : false}
          startTimer={() => handleStart(id)}
          pauseTimer={() => handleStop(id)}
          formatTime={() => formatTime(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TodoList