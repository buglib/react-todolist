import React from "react"
import { Component } from "react"
import Header from "./components/header"
import List from "./components/list"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  render() {
    const tasks = this.state.tasks
    return (
      <div className="todolist-container">
        <div className="todolist-wrap">
          <Header addTask={this.addTask} />
          <List tasks={tasks} />
        </div>
      </div>
    )
  }
}