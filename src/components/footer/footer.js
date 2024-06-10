import { Component } from 'react'

import TodoCount from '../todo-count'
import TasksFilter from '../tasks-filter'
import ClearCompleted from '../clear-completed'
import './footer.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class Footer extends Component {
  render() {
    const { doneCount, currentTab, setFilter, activeFilter, deleteCompletedItem } = this.props

    return (
      <footer className="footer">
        <TodoCount doneCount={doneCount} />
        <TasksFilter currentTab={currentTab} setFilter={setFilter} activeFilter={activeFilter} />
        <ClearCompleted deleteCompletedItem={deleteCompletedItem} />
      </footer>
    )
  }
}
