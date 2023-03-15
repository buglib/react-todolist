import React from "react"
import { Component } from "react"
import Item from "./item"

export default class List extends Component {
  render() {
    return (
      <div className="todolist-body">
        <ul className="todolist-main">
          <Item />
        </ul>
      </div>
    )
  }
}