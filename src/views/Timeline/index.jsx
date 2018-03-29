import React from 'react'
import { Row, Col } from 'antd'
import PanelBox from '../../components/PanelBox'
import Line from '../../components/MChart/Line'
import Data from '../../../fake/maima.json'

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
            <PanelBox title='卖吗历史收益统计'>
              <Line />
            </PanelBox>
          </Col>
        </Row>
      </div>
    )
  }
}
