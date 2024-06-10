import { Component } from 'react'

import AppHeader from '../app-header'
import AddForm from '../add-form'
import TodoList from '../todo-list'
import Footer from '../footer'
import './app.css'

export default class App extends Component {
  
  maxId = 100

  state = {
    filter: 'all',
    todoData: []
  }

  addItem = (text) => {
    const newItem = this.createItem(text)
    this.setState(({ todoData }) => {
      const newArray = [newItem, ...todoData]
      return {
        todoData: newArray,
      }
    })
  }

  toggleEditMode = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const updatedItem = { ...oldItem, editMode: !oldItem.editMode }
      const newArray = [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  editItem = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const updatedItem = { ...oldItem, label: newText, editMode: false }
      const newArray = [...todoData.slice(0, idx), updatedItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  deleteCompletedItem = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.done === false)
      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  createItem(label) {
    return {
      id: this.maxId++,
      label,
      done: false,
      dateCreated: new Date(),
      timer: 0, // Добавляем поле timer для хранения значения таймера
    }
  }

  render() {
    const { todoData, filter } = this.state
    const doneCount = todoData.filter((el) => !el.done).length

    let filteredTasks = todoData
    if (filter === 'completed') {
      filteredTasks = todoData.filter((task) => task.done === true)
    }
    if (filter === 'active') {
      filteredTasks = todoData.filter((task) => task.done === false)
    }

    return (
      <div className="todoapp">
        <div className="main">
          <AppHeader />
          <AddForm addItem={this.addItem} />
          <TodoList
            todos={filteredTasks}
            onToggleDone={this.onToggleDone}
            toggleEditMode={this.toggleEditMode}
            editItem={this.editItem}
            deleteItem={this.deleteItem}
          />
          <Footer
            doneCount={doneCount}
            setFilter={this.setFilter}
            activeFilter={filter}
            deleteCompletedItem={this.deleteCompletedItem}
          />
        </div>
      </div>
    )
  }
}
