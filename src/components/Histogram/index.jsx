import React from 'react'
import { Frame } from 'g2'
import createG2 from 'g2-react'

const data = [
  {name: '上涨', data: [57, 20, 10, 5, 0, 2, 0, 0, 0, 0]},
  {name: '下跌', data: [54, 29, 10, 2, 0, 1, 0, 0, 0, 0]}
]

export default class Histogram extends React.Component {
  constructor () {
    super()
    const Chart = createG2(chart => {
      chart.col('name', {alias: '趋势'})
      chart.intervalDodge().position('振幅*天数').color('name', ['#E83032', '#076902'])
      chart.render()
    })
    for (let i = 0, len1 = data.length; i < len1; i++) {
      let item = data[i]
      let datas = item.data
      let labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10']
      for (let j = 0, len2 = datas.length; j < len2; j++) {
        item[labels[j]] = datas[j]
      }
      data[i] = item
    }
    let frame = new Frame(data)
    frame = Frame.combinColumns(frame, ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'], '天数', '振幅', 'name')
    this.state = {
      data: frame,
      forceFit: true,
      width: 500,
      height: 350,
      plotCfg: {
        margin: [20, 90, 60, 60]
      },
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
        />
      </div>
    )
  }
}
