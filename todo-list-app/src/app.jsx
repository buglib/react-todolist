import React from "react"
import { Component } from "react"
import Header from "./components/header"
import List from "./components/list"
import Footer from "./components/footer"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inc: 0,
      tasks: [],
      currentView: "all" // all tasks, done tasks and todo tasks
    }
  }

  render() {
    // console.log("render " + this.state.currentView + " view")
    return (
      <div className="todolist-container">
        <div className="todolist-wrap">
          <Header addTask={this.addTask} />
          <List 
            currentView={this.state.currentView} 
            listTasks={this.listTasks} 
            removeTask={this.removeTask} 
            updateTask={this.updateTask}
          />
          <Footer switchView={this.switchView} />
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

  listTasks = (view) => {
    // console.log("change view")
    // const view = this.state.currentView
    const tasks = this.state.tasks.slice()
    if (view === "all") {
      return tasks
    }
    if (view === "done") {
      return tasks.filter((task) => {
        return task.done === true
      })
    }
    if (view === "todo") {
      return tasks.filter((task) => {
        return task.done === false
      })
    }
  }

  switchView = (view) => {
    if (view === "all" || view === "done" || view === "todo") {
      this.setState({
        currentView: view
      })
    }
  }
}