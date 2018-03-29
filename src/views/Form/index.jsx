import React from 'react'
import { Row, Col } from 'antd'
import PanelBox from '../../components/PanelBox'
import Scatter from '../../components/Scatter'
import Data from '../../../fake/180012.json'

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      data: Data
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  callback () {
  }

  render () {
    return (
      <div>
        <Row gutter={16} type='flex' justify='space-between'>
          <Col xs={24} md={24}>
            <PanelBox title='2016 - 2017 年度累计收益走势'>
              <Scatter data={this.state.data} />
            </PanelBox>
          </Col>
        </Row>
      </div>
    )
  }
}
