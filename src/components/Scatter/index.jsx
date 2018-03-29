import React from 'react'
import { Plugin } from 'g2'
import createG2 from 'g2-react'
import 'g2-plugin-slider'
import PropTypes from 'prop-types'
import _ from 'lodash'
import mas from '../../../fake/scatter.json'

let nnos = _.keys(mas)
_.forEach(nnos, item => {
  if (/^[X8][X0][X0][X1]/.test(item)) {
    console.log(item)
    console.log(mas[item])
  }
})

let tongji = {}

tongji.periods = '18023'
tongji.JX = 0

let list = []
let i = 1
const types = ['four', 'three', 'two']
for (let key in mas) {
  let number = _.sum(_.map(mas[key], item => (+item.m)))
  let type = (key.match(/X/g) || []).length
  list.push({
    key,
    number,
    type
  })
}
list = list.sort((a, b) => {
  return a.type - b.type
}).map(item => {
  let type = item.type
  i += Math.floor(Math.random() * 10)
  return {
    ...item,
    type: types[type],
    num: i
  }
})

let kk = _.sum(_.map(list, 'number'))
console.log(kk)

// =================================================================
// 分析
const odds = [8500, 860, 93]
const Max = 5000
let result = [] // 吃码记录
let touwei = [] // 头尾记录
let total = 0 // 总收入金额
let twNum // 头尾个数
let ptTotal // 平摊可能收入

for (let key in mas) {
  let type = (key.match(/X/g) || []).length
  let sum = _.sum(_.map(mas[key], ({f, m}) => (f * m)))
  let temp
  // 头尾统计
  if (/\dXX\d/.test(key)) {
    touwei.push(key)
  }
  // 收入统计
  if (sum <= Max) {
    temp = _.sum(_.map(mas[key], item => (+item.m)))
  } else {
    temp = ~~(Max / odds[type])
  }
  total += +temp
  result.push({
    key,
    number: temp,
    type
  })
}
// 吃码过滤
result = result.filter(item => {
  return item.number
})
tongji.Total = total
console.log(`总收入：${total}元`)
tongji.Nums = result.length
console.log(`总码数：${result.length}个`)
twNum = touwei.length
ptTotal = ~~(total / twNum) * odds[2]
tongji.Touwei = twNum
console.log(`总头尾数：${twNum}个`)
tongji.PTotal = ptTotal
console.log(`平摊可能收入：${~~(total / twNum)}x${odds[2]}=${ptTotal}`)

// 中奖可能分析
let source = result.map(item => (item.key))
let kaiJ = {}
let profit = [] // 全吃盈利
let ptProfit = [] // 平摊盈利
let num = 0
for (let a = 0; a < 10; a++) {
  for (let b = 0; b < 10; b++) {
    for (let c = 0; c < 10; c++) {
      for (let d = 0; d < 10; d++) {
        let reg = `^[${a}X][${b}X][${c}X][${d}X]$`
        let no = `_${a}${b}${c}${d}`
        let money = 0
        let hasTwFlag = 0
        let nos
        let len
        reg = new RegExp(reg)
        nos = source.filter(item => (reg.test(item)))
        len = nos.length
        if (len) {
          num++
          // 赔付统计
          nos.forEach(item => {
            hasTwFlag = !hasTwFlag ? ~touwei.indexOf(item) : true
            let key = item.replace('_', '')
            let tmp = result.filter(temp => (temp.key === key))[0]
            let {number, type} = tmp
            let odd = odds[type]
            money += odd * number
          })
          profit.push({
            no,
            money: total - money
          })
          money = hasTwFlag ? (ptTotal - money) : -money
          ptProfit.push({
            no,
            money
          })
          money = 0
          hasTwFlag = 0
        }
        if (len > 3) {
          kaiJ[no] = nos
        }
      }
    }
  }
}
// 中奖概率
tongji.WinR = num / 100
console.log(`中奖概率：${num / 100}%`)
// 全吃盈利概率
let len, average

profit = _.countBy(profit, 'money')
profit[total] = 10000 - num
profit = _.map(_.keys(profit), key => ({
  money: +key,
  rate: profit[key] / 100
}))
profit.sort((a, b) => (b.money - a.money))
len = profit.length - 1
// console.table(profit)
window.profit = profit
console.log(`全吃最多可赚${profit[0].money}元，开奖概率为：${profit[0].rate}%`)
console.log(`全吃最多可亏${-profit[len].money}元，开奖概率为：${profit[len].rate}%`)
average = _.reduce(profit, (sum, {money, rate}) => (sum + money * rate / 100), 0).toFixed(2)
console.log(`全吃平均每期收益为：${average}元`)
profit = profit.filter(item => (item.money >= 0)).map(item => (item.rate))
profit = _.sum(profit).toFixed(2)
tongji.QRate = profit
console.log(`全吃盈利概率:${profit}%`)

// 平摊盈利概率
ptProfit = _.countBy(ptProfit, 'money')
ptProfit = _.map(_.keys(ptProfit), key => ({
  money: +key,
  rate: ptProfit[key] / 100
}))
ptProfit.sort((a, b) => (b.money - a.money))
len = ptProfit.length - 1
// console.table(ptProfit)
window.ptProfit = ptProfit
console.log(`平摊最多可赚${ptProfit[0].money}元，开奖概率为：${ptProfit[0].rate}%`)
console.log(`平摊最多可亏${-ptProfit[len].money}元，开奖概率为：${ptProfit[len].rate}%`)
average = _.reduce(ptProfit, (sum, {money, rate}) => (sum + money * rate / 100), 0).toFixed(2)
console.log(`平摊平均每期收益为：${average}元`)
ptProfit = ptProfit.filter(item => (item.money >= 0)).map(item => (item.rate))
ptProfit = _.sum(ptProfit).toFixed(2)
tongji.PRate = ptProfit
console.log(`平摊盈利概率:${ptProfit}%`)

console.log(JSON.stringify(tongji))
// =================================================================

const Slider = Plugin.slider

export default class Stock extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  constructor (props) {
    super()
    // let { data } = props
    const Chart = createG2(chart => {
      chart.source(list)
      // chart.source(result)
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'cross'
        }
      })
      chart.point().position('num*number')
        .color('type', ['#FF0000', '#00FF00', '#0000FF'])
        .size(2)
        .opacity(0.65)
        .shape('circle')
        .tooltip('key*number')

      // 创建滑动条
      let slider = new Slider({
        domId: 'range',
        width: 500,
        height: 30,
        charts: [chart],
        xDim: 'num',
        yDim: 'number',
        start: 0,
        end: i + 20
      })
      slider.render()
      this.chart = chart
    })
    this.state = {
      data: list,
      // data: result,
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
      this.chart.changeData(data)
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
