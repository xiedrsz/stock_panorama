import React from 'react'
import { Plugin, Frame } from 'g2'
import createG2 from 'g2-react'
import 'g2-plugin-slider'
import PropTypes from 'prop-types'

const Slider = Plugin.slider

function transform2frame (data) {
  // 主图指标 数据转换
  data = data.map(item => {
    return {
      PDATE: item.PDATE,
      '本基金': item.YIELD,
      '参考指数': item.INDEXYIED
    }
  })
  let frame = new Frame(data)
  // 主图指标 系列合并
  frame = Frame.combinColumns(frame, ['本基金', '参考指数'], 'value', '类别')
  return frame
}

export default class Stock extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  constructor (props) {
    super()
    let { data } = props
    let frame = transform2frame(data)
    const Chart = createG2(chart => {
      chart.source(frame, {
        'PDATE': {
          type: 'timeCat',
          nice: false,
          mask: 'mm-dd',
          alias: '日期',
          tickCount: 10,
          range: [0, 1]
        }
      })
      chart.col('value', {
        alias: '累计收益, %'
      })
      chart.axis('PDATE', {
        line: null,
        tickLine: {
          stroke: '#000',
          value: 6 // 刻度线长度
        },
        title: null
      })
      chart.axis('value', {
        tickLine: {
          stroke: '#000',
          value: 6 // 刻度线长度
        },
        labels: {
          label: {
            fill: '#000'
          }
        },
        line: {
          stroke: '#000'
        },
        grid: null
      })
      chart.legend({
        position: 'right',
        dx: 30
      })
      chart.line().position('PDATE*value').color('类别', ['#1f77b4', '#ff7f0e'])

      // 创建滑动条
      let slider = new Slider({
        domId: 'range',
        width: 500,
        height: 30,
        charts: [chart],
        xDim: 'PDATE',
        yDim: 'value',
        start: '2016-11-03',
        end: '2017-11-03'
      })
      slider.render()
      this.chart = chart
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

  componentWillReceiveProps (nextProps) {
    let { data } = nextProps
    if (this.chart) {
      let frame = transform2frame(data)
      this.chart.changeData(frame)
    }
  }

  componentDidMount () {
  }

  changeData () {
    console.log('shuu')
  }

  callback () {

  }

  render () {
    return (
      <div>
        <this.state.Chart
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          plotCfg={this.state.plotCfg}
          forceFit={this.state.forceFit}
          ref='myChart'
        />
        <div id='c1'></div>
        <div id='range'></div>
      </div>
    )
  }
}
