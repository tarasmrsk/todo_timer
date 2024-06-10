import { Component } from 'react'
import './add-form.css'

export default class AddForm extends Component {
  state = {
    label: '',
  }

  handleChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  handleKeyPress = (e) => {
    const { label } = this.state
    if (e.key === 'Enter' && label.trim() !== '') {
      const { addItem } = this.props
      addItem(label)
      this.setState({ label: '' })
    }
  }

  render() {
    const { label } = this.state
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}
