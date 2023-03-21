import React from "react"
import { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <div className="todolist-header">
        <input id="input-task" type="text" placeholder="请输入待办任务" />
        <button onClick={() => this.handleClick()}>添加</button>
      </div>
    )
  }

  handleClick() {
    // todo: 输入框内容需要判空，而且点击添加按钮之后需要清空输入框
    const inputElem = document.getElementById("input-task")
    const taskInfo = inputElem.value
    if (taskInfo !== null && taskInfo !== undefined) {
      const taskInfoTrimed = taskInfo.trim()
      if (taskInfoTrimed !== "") {
        this.props.addTask(taskInfoTrimed, false)
        inputElem.value = ""
      }
    }
  }
}