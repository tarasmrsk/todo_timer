import { Component } from 'react'
import './tasks-filter.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class TasksFilter extends Component {
  render() {
    const { setFilter, activeFilter } = this.props
    const onAllClickHandler = () => setFilter('all')
    const onActiveClickHandler = () => setFilter('active')
    const onCompletedClickHandler = () => setFilter('completed')

    return (
      <ul className="filters">
        <li>
          <button type="button" className={activeFilter === 'all' ? 'selected' : ''} onClick={onAllClickHandler}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={activeFilter === 'active' ? 'selected' : ''} onClick={onActiveClickHandler}>
            Active
          </button>
        </li>
        <li>
          <button type="button" className={activeFilter === 'completed' ? 'selected' : ''} onClick={onCompletedClickHandler}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
