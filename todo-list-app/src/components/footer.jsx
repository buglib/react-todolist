import React from "react"
import { Component } from "react"

export default class Footer extends Component {
  render() {
    return (
      <div className="todolist-footer">
        <label>
          <input 
            type="radio"
            name="view" 
            value="all" 
            // defaultChecked={true}
            onChange={this.handleChange("all")}
          />
          <span>全部任务</span>
        </label>

        <label>
          <input 
            type="radio"
            name="view" 
            value="done" 
            // defaultChecked={false}
            onChange={this.handleChange("done")}
          />
          <span>已完成任务</span>
        </label>

        <label>
          <input 
            type="radio"
            name="view" 
            value="todo" 
            // defaultChecked={false}
            onChange={this.handleChange("todo")}
          />
          <span>未完成任务</span>
        </label>
      </div>
    )
  }

  handleChange = (view) => {
    return (event) => {
      if (event.target.checked) {
        this.props.switchView(view)
      }
    }
  }

  // handleClickAll = () => {
  //   this.props.switchView("all")
  // }

  // handleClickDone = () => {
  //   this.props.switchView("done")
  // }

  // handleClickTodo = () => {
  //   this.props.switchView("todo")
  // }
}
