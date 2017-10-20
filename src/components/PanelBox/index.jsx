import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

import './index.less'

export default class PanelBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    bodyStyle: PropTypes.string,
    children: PropTypes.any
  }

  render () {
    return (
      <Card className={'panel-box ' + this.props.className} title={this.props.title} bordered={false} bodyStyle={this.props.bodyStyle}>
        {this.props.children}
      </Card>
    )
  }
}
