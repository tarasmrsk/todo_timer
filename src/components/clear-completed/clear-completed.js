import { Component } from 'react'
import './clear-completed.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class ClearCompleted extends Component {
  render() {
    const { deleteCompletedItem } = this.props

    return (
      <button type="button" className="clear-completed" onClick={deleteCompletedItem}>
        Clear completed
      </button>
    )
  }
}
