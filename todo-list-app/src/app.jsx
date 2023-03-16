import React from "react"
import { Component } from "react"
import Header from "./components/header"
import List from "./components/list"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inc: 0,
      tasks: []
    }
  }

  render() {
    return (
      <div className="todolist-container">
        <div className="todolist-wrap">
          <Header addTask={this.addTask} />
          <List 
            tasks={this.state.tasks} 
            removeTask={this.removeTask} 
            updateTask={this.updateTask}
          />
        </div>
      </div>
    )
  }

  addTask = (taskInfo, done) => {
    const oldTasks = this.state.tasks
    const id = this.state.inc
    const newTasks = [{id, taskInfo, done}, ...oldTasks]
    this.setState({
      inc: id + 1,
      tasks: newTasks
    })
  }

  removeTask = (id) => {
    const oldTasks = this.state.tasks.slice()
    const newTasks = oldTasks.filter((task) => {
      return task.id !== id
    })
    this.setState({
      tasks: newTasks
    })
  }

  updateTask = (id, done) => {
    const oldTasks = this.state.tasks
    const newTasks = oldTasks.map((task) => {
      if (task.id === id) {
        return {...task, done: done}
      } else {
        return task
      }
    })
    this.setState({
      tasks: newTasks
    })
  }
}