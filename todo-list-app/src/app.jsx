import React from "react"
import { Component } from "react"
import Header from "./components/header"
import List from "./components/list"

export default class App extends Component {
  render() {
    return (
      <div className="todolist-container">
        <div className="todolist-wrap">
          <Header />
          <List />
        </div>
      </div>
    )
  }
}