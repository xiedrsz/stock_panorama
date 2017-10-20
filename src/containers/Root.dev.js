import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import route from '../route'
import DevTools from './DevTools'
import { HashRouter as Router } from 'react-router-dom'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.any
  }

  render () {
    const { store } = this.props
    if (!this.route) this.route = route
    return (
      <Provider store={store}>
        <div>
          <Router children={this.route} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
