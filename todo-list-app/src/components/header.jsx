import React from "react"
import { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <div className="todolist-header">
        <input type="text" placeholder="请输入待办任务" />
        <button>添加</button>
      </div>
    )
  }
}