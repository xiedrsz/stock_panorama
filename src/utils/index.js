export function isPromise (value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function'
  }
}

export function getCookie (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export function investmentDaily (data) {
  let len = data.length
  let lastYIELD = data[len - 1].YIELD
  let sum = 0
  let YIELD
  data.forEach(item => {
    YIELD = item.YIELD
    sum += YIELD
  })
  sum = (len * lastYIELD - sum) / (len - 1)
  sum = sum.toFixed(1) + '%'
  return sum
}

export function investmentWeekly (data, long = 5) {
  let i = 0
  let len = data.length
  let lastYIELD = data[len - 1].YIELD
  let sum = 0
  let YIELD
  for (; i < len; i += long) {
    YIELD = data[i].YIELD
    sum += lastYIELD - YIELD
  }
  sum = sum / (len / long | 0)
  sum = sum.toFixed(1) + '%'
  return sum
}
