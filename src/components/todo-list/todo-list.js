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
              if (timer.time > 0) {
                updatedTimers[key] = {
                  time: timer.time - 1,
                  isRunning: true
                }
              } else {
                updatedTimers[key] = {
                  time: 0,
                  isRunning: false
                }
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
    const currentTodo = todos.find(todo => todo.id === id)

    const minutes = parseInt(currentTodo.minutes, 10) || 0
    const seconds = parseInt(currentTodo.seconds, 10) || 0

    const timeFromTodo = currentTodo ? minutes * 60 + seconds : 60
    const timer = timers[id]
    let startTime = timeFromTodo

    if (timer && !timer.isRunning && timer.time > 0) {
      startTime = timer.time
    }
  
    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: { time: startTime, isRunning: true }
    }))
  }

  const handleStop = (id) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: { ...prevTimers[id], isRunning: false }
    }))
  }

  const formatTime = (id) => {
    const currentTodo = todos.find(todo => todo.id === id)
    const min = parseInt(currentTodo.minutes, 10) || 0
    const sec = parseInt(currentTodo.seconds, 10) || 0

    const timer = timers[id]
    if (timer && timer.time !== undefined) {
      const { time } = timer
      if (time <= 0) {
        return '00:00'
      }
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      return `${(minutes < 10 ? '0' : '') + minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return `${(min < 10 ? '0' : '') + min}:${sec < 10 ? '0' : ''}${sec}`
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
