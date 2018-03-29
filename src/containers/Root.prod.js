import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import route from '../route'
import { HashRouter as Router } from 'react-router-dom'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.any
  }

  render () {
    const {store} = this.props
    if (!this.route) this.route = route
    return (
      <Provider store={store}>
        <Router children={this.route} />
      </Provider>
    )
  }
}
