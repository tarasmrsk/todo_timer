import { Component } from 'react'
import './todo-count.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class TodoCount extends Component {
  render() {
    const { doneCount } = this.props

    return <span className="todo-count">{doneCount} items left</span>
  }
}
