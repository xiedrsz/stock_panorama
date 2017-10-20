import React from 'react'
import { Row, Col, Table, Alert, Icon } from 'antd'
import PanelBox from '../../components/PanelBox'

import { Plugin, Frame } from 'g2'
import createG2 from 'g2-react'
import 'g2-plugin-slider'
import data from '../../../fake/candleSticks.json'
import './index.less'

const Slider = Plugin.slider

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
    const frame = new Frame(data)
    frame.addCol('trend', function (obj) {
      return (obj.start <= obj.end) ? 0 : 1
    })

    const Chart = createG2(chart => {
      chart.source(frame, {
        'trend': {
          type: 'cat',
          alias: '趋势',
          values: ['上涨', '下跌']
        },
        'time': {
          type: 'timeCat',
          nice: false,
          mask: 'mm-dd',
          alias: '时间',
          tickCount: 10,
          range: [0, 1]
        },
        'volumn': {
          alias: '成交量'
        },
        'start': {
          alias: '开盘价'
        },
        'end': {
          alias: '收盘价'
        },
        'max': {
          alias: '最高价'
        },
        'min': {
          alias: '最低价'
        },
        'start+end+max+min': {
          alias: '股票价格'
        }
      })
      chart.axis('time', {
        title: null
      })
      chart.schema()
        .position('time*(start+end+max+min)')
        .color('trend', ['#076902', '#E83032'])
        .shape('candle')
        .tooltip('start*end*max*min*volumn')

      // 创建滑动条
      var slider = new Slider({
        domId: 'range',
        width: 500,
        height: 30,
        charts: chart,
        xDim: 'time',
        yDim: 'max'
      })
      slider.render()
    })
    this.state = {
      data: data,
      width: 500,
      height: 250,
      plotCfg: {
        margin: [30, 120, 30],
        background: {
          fill: '#ffffff'
        }
      },
      forceFit: true,
      Chart: Chart
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
                    <li>$25,000</li>
                    <li>今日收入</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col xs={24} md={8}>
                <PanelBox className='card-item'>
                  <Icon type='pay-circle-o' />
                  <ul>
                    <li>$25,000</li>
                    <li>今日收入</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col xs={24} md={8}>
                <PanelBox className='card-item'>
                  <Icon type='pay-circle-o' />
                  <ul>
                    <li>$25,000</li>
                    <li>今日收入</li>
                  </ul>
                </PanelBox>
              </Col>
            </Row>
            <PanelBox title='最近的数据'>
              <this.state.Chart
                data={this.state.data}
                width={this.state.width}
                height={this.state.height}
                plotCfg={this.state.plotCfg}
                forceFit={this.state.forceFit}
                ref='myChart'
              />
              <div id='range'></div>
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
