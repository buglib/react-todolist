import axios from "axios"
import { Component } from "react"
import Header from "./components/header"
import List from "./components/list"
import Footer from "./components/footer"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      currentView: "all", // all tasks, done tasks and todo tasks
      error: null
    }
    // 首次加载时，从服务端获取所有的任务
    this.getTodolist()
  }

  render() {
    // console.log("render " + this.state.currentView + " view")
    const error = this.state.error
    if (!error) {
      return (
        <div className="todolist-container">
          {/* <div className="todolist-wrap"> */}
          <Header addTask={this.addTask} />
          <List 
            currentView={this.state.currentView} 
            listTasks={this.listTasks} 
            removeTask={this.removeTask} 
            updateTask={this.updateTask}
          />
          <Footer switchView={this.switchView} />
          {/* </div> */}
        </div>
      )
    } else {
      console.log(error)
      window.alert(error)
    }
  }

  listTasks = (view) => {
    // // 先从后端获取所有任务
    // if (this.state.tasks.length === 0) {
    //   this.getTodolist()
    // }
    // 然后根据当前视图类型展示对应的任务列表
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
        return task.done !== true
      })
    }
  }

  addTask = (taskInfo, done) => {
    const oldTasks = this.state.tasks
    // const id = this.state.inc
    const task = {taskInfo, done}
    this.postTodolist(task).then((id) => {
      task.id = id
      // console.log("task id is: ", task.id)
      const newTasks = [task, ...oldTasks]
      this.setState({tasks: newTasks})
    })
  }

  removeTask = (id) => {
    const oldTasks = this.state.tasks.slice()
    const newTasks = oldTasks.filter((task) => {
      return task.id !== id
    })
    this.deleteTodoItem(id)
    this.setState({
      tasks: newTasks
    })
  }

  updateTask = (id, done) => {
    const oldTasks = this.state.tasks
    const newTasks = oldTasks.map((task) => {
      if (task.id === id) {
        task.done = done
        this.putTodoItem(task)
        return task
      } else {
        return task
      }
    })
    this.setState({
      tasks: newTasks
    })
  }

  switchView = (view) => {
    if (view === "all" || view === "done" || view === "todo") {
      this.setState({
        currentView: view
      })
    }
  }

  getTodolist() {
    console.log("get all tasks from sever side")
    client.get("/v1/todolist")
      .then((resp) => {
        this.setState({
          tasks: resp.data.data
        })
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      })
  }

  async postTodolist(task) {
    var promise = client.post(
      "/v1/todolist",
      task
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      } else {
        return resp.data.data.id
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
      return -1
    })
    return promise
  }

  putTodoItem(task) {
    client.put(
      "/v1/todolist/" + task.id,
      task
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
    })
  }

  deleteTodoItem(id) {
    // todo: id使用前需要判空
    client.delete(
      "/v1/todolist/" + id
    ).then((resp) => {
      if (resp.status !== 200) {
        this.setState({
          error: resp.data.message
        })
      }
    }).catch((error) => {
      this.setState({
        error: error
      })
    })
  }
}