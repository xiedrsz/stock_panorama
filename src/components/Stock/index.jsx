import React from 'react'
import G2, { Plugin, Frame } from 'g2'
import createG2 from 'g2-react'
import 'g2-plugin-slider'
import Data from '../../../fake/candleSticks.json'

const Slider = Plugin.slider

function splitData (data) {
  return {
    'md5': calculateMA(5, data),
    'md10': calculateMA(10, data),
    'md20': calculateMA(20, data),
    'md30': calculateMA(30, data)
  }
}

function calculateMA (dayCount, data) {
  let result = []
  for (let i = 1, len = data.length; i <= len; i++) {
    if (len - i < dayCount - 1) {
      result.push(null)
      continue
    }
    let sum = 0
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - 1 + j].end
    }
    result.push(+(sum / dayCount).toFixed(3))
  }
  return result
}

export default class Stock extends React.Component {
  constructor () {
    super()
    let data = Data

    // 主图指标 数据转换
    let { md5, md10, md20, md30 } = splitData(data)
    data = data.map((item, i) => {
      return {
        ...item,
        md5: md5[i],
        md10: md10[i],
        md20: md20[i],
        md30: md30[i]
      }
    })

    let frame = new Frame(data)

    // 主图指标 系列合并
    frame = Frame.combinColumns(frame, ['md5', 'md10', 'md20', 'md30'], 'value', 'type')

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

      // 主图指标 图形配置
      chart.axis('value', false)
      chart.line().position('time*value').color('type', ['#AC4640', '#2D3C48', '#609099', '#BE7459'])

      // Todo 副图， 待整理
      let chart1 = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 60,
        plotCfg: {
          margin: [0, 120, 0]
        }
      })
      chart1.source(frame, {
        'time': {
          type: 'timeCat',
          nice: false,
          mask: 'mm-dd',
          alias: '时间',
          tickCount: 10,
          range: [0, 1]
        }
      })
      chart1.axis('time', {
        title: null,
        labels: null,
        tickLine: null,
        line: {
          stroke: '#444'
        }
      })
      chart1.axis('volumn', false)
      chart1.interval()
        .position('time*volumn')
        .color('#81BC9D')
        .tooltip('volumn')
      chart1.legend('trend', false)

      // 创建滑动条
      let slider = new Slider({
        domId: 'range',
        width: 500,
        height: 30,
        charts: [chart, chart1],
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
