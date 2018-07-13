import 'babel-polyfill'
import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
// import asyncComponent from 'assets/async'
// import { observer } from 'mobx-react'
// import createBrowserHistory from 'history/createBrowserHistory'
import './style.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dev: window.CONSTANT.env !== 'production',
      reloadClient: false
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    const { reloadClient } = this.state
    return (
      <div className="app">
        test
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('app'))