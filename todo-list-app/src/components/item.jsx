import React from "react"
import { Component } from "react"

export default class Item extends Component {
  render() {
    return (
      <li>
        <label>
          <input type="checkbox" />
          <span>task</span>
        </label>
        <button>删除</button>
      </li>
    )
  }
}