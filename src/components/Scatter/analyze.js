import record from '../../../fake/maimaRecord.json'
import _ from 'lodash'

console.log('==================================================')

let sum = _.sum(_.map(_.keys(record), n => record[n]))
console.log(`总买码金额：${sum}元`)

const Fs = [8500, 860, 95]
const Max = [1, 10, 52]
_.forEach(_.keys(record), n => {
  let args = n.match(/X/g) || []
  let len = args.length
  record[n] = Max[len] > record[n] ? record[n] : Max[len]
})
sum = _.sum(_.map(_.keys(record), n => record[n]))
console.log(`总吃金额：${sum}元`)

_.forEach(_.keys(record), n => {
  let args = n.match(/X/g) || []
  let len = args.length
  record[n] *= Fs[len]
})

const Nos = _.map(_.keys(record), n => n.replace(/^_/, ''))
let profits = []
for (let a = 0; a < 10; a++) {
  for (let b = 0; b < 10; b++) {
    for (let c = 0; c < 10; c++) {
      for (let d = 0; d < 10; d++) {
        let reg = `^[${a}X][${b}X][${c}X][${d}X]$`
        let key = `${a}${b}${c}${d}`
        let temp = {}
        let no, money
        reg = new RegExp(reg)
        temp.no = no = _.filter(Nos, n => reg.test(n))
        money = _.map(no, n => record[`_${n}`])
        temp.money = money = sum - _.sum(money)
        temp.key = key
        profits.push(temp)
      }
    }
  }
}
let win = _.filter(profits, ({money}) => money > 0)
win = win.length
win /= 100
console.log(`盈利概率：${win.toFixed(2)}%`)

profits.sort((a, b) => (a.money - b.money))
let toBig = _.filter(profits, ({money}) => money < -12000)
console.log(toBig)

let zhj = _.filter(profits, ({money}) => money < sum)
zhj = zhj.length
zhj = zhj / 100
console.log(`中奖概率: ${zhj.toFixed(2)}%`)
console.log('==================================================')
