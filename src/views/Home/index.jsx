import React from 'react'
import { Row, Col, Table, Alert, Icon, Input } from 'antd'
import PanelBox from '../../components/PanelBox'
// import Stock from '../../components/Stock'
import Line from '../../components/Line'
// import Histogram from '../../components/Histogram'
// import G2 from 'g2'
// import createG2 from 'g2-react'
import Data from '../../../fake/180012.json'
import Data1 from '../../../fake/110027.json'
import { investmentDaily, investmentWeekly } from '@/utils'
import './index.less'

const Search = Input.Search
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 150
}, {
  title: 'Address',
  dataIndex: 'address'
}]

const tableData = []
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      yieldD: investmentDaily(Data),
      yieldW: investmentWeekly(Data),
      yieldM: investmentWeekly(Data, 22),
      data: Data
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  callback () {
  }

  changeSource = () => {
    this.setState({
      data: Data1
    })
  }

  render () {
    return (
      <div>
        <Row gutter={16} type='flex' justify='end' style={{ 'height': '2.4em', 'marginBottom': '20px' }}>
          <Col>
            <Search
              placeholder='请输入基金代码'
              style={{ width: 200 }}
              onSearch={this.changeSource}
            />
          </Col>
        </Row>
        <div style={{'marginBottom': '20px'}}>
          <Alert
            message='消息提示的文案1'
            description='消息提示的辅助性文字介绍消息提示的辅助性文，字介绍消息提示的辅助性文字介绍'
            type='info'
            showIcon
          />
        </div>
        <Row gutter={16} type='flex' justify='space-between'>
          <Col xs={24} md={24}>
            <Row gutter={16} type='flex' justify='space-between'>
              <Col xs={24} md={8}>
                <PanelBox className='card-item'>
                  <Icon type='pay-circle-o' />
                  <ul>
                    <li>每日定投</li>
                    <li>{this.state.yieldD}</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col xs={24} md={8}>
                <PanelBox className='card-item'>
                  <Icon type='pay-circle-o' />
                  <ul>
                    <li>每周定投</li>
                    <li>{this.state.yieldW}</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col xs={24} md={8}>
                <PanelBox className='card-item'>
                  <Icon type='pay-circle-o' />
                  <ul>
                    <li>每月定投</li>
                    <li>{this.state.yieldM}</li>
                  </ul>
                </PanelBox>
              </Col>
            </Row>
            <PanelBox title='2016 - 2017 年度累计收益走势'>
              {/* <Stock /> */}
              <Line data={this.state.data} />
              {/* <Histogram /> */}
            </PanelBox>
          </Col>
        </Row>

        <PanelBox title='最近的数据'>
          <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </PanelBox>
      </div>
    )
  }
}
