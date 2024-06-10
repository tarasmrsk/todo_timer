import React, { Component } from 'react'
import './app-header.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class AppHeader extends Component {
  render() {
    return (
      <header className="header">
        <h1>Todo List</h1>
      </header>
    )
  }
}