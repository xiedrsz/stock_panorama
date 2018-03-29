import React from 'react'
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'
import data from '../../../../fake/maima.json'

const ds = new DataSet()
const dv = ds.createView().source(data)
dv
  .transform({
    type: 'rename',
    map: {
      Total: '总吃金额',
      PTotal: '可能收入',
      Nums: '总码数量',
      Touwei: '头尾数量',
      WinR: '中奖概率',
      QRate: '全吃赢率',
      PRate: '平摊赢率',
      QOdd: '全吃累赚',
      POdd: '平摊累赚'
    }
  })
  .transform({
    type: 'fold',
    fields: [ '总吃金额', '可能收入', '全吃累赚', '平摊累赚', 'JX' ], // 展开字段集
    key: 'mType', // key字段
    value: 'money' // value字段
  })
  .transform({
    type: 'fold',
    fields: [ '总码数量', '头尾数量', '中奖概率', '全吃赢率', '平摊赢率' ], // 展开字段集
    key: 'rType', // key字段
    value: 'rate' // value字段
  })
const cols = {
  periods: {
    range: [ 0, 1 ]
  }
}

export default class Stock extends React.Component {
  constructor (props) {
    super()
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  componentDidMount () {
  }

  render () {
    return (
      <Chart height={400} data={dv} scale={cols} padding={[40, 40, 80, 40]} forceFit>
        <Legend />
        <Axis name='periods' />
        <Axis name='money' />
        <Tooltip crosshairs={{type: 'cross'}} />
        <Geom type='line' position='periods*money' size={1} color={'mType'} />
        <Geom type='line' position='periods*rate' size={2} color={'rType'} />
        {/* <Geom type='point' position='periods*temperature' size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1 }} /> */}
      </Chart>
    )
  }
}
