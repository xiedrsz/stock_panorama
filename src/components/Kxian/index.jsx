import GM from 'g2-mobile';
import React from 'react';

console.log(GM)
const Chart = createG2(chart => {
  var Stat = G2.Stat;
  chart.col('trend', {
    type: 'cat',
    alias: '趋势',
    values: ['上涨','下跌']
  });
  chart.col('time', {
    type: 'timeCat',
    nice: false,
    mask: 'mm-dd',
    alias: '时间',
    tickCount: 10
  });
  chart.col('volumn', {alias: '成交量'});
  chart.col('start', {alias: '开盘价'});
  chart.col('end', {alias: '收盘价'});
  chart.col('max', {alias: '最高价'});
  chart.col('min', {alias: '最低价'});
  chart.col('start+end+max+min', {alias: '股票价格'});
  chart.axis('time', {
    title: null
  });
  chart.schema()
    .position('time*(start+end+max+min)')
    .color('trend', ['#2AF483','#F80041'])
    .shape('candle')
    .tooltip('start*end*max*min*volumn');
  var frame = chart.get('data');
  var chart1 = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 60,
    plotCfg: {
      margin: [5, 120, 10],
      background: {
        fill: '#191821'
      }
    }
  });
  chart1.source(frame);
  chart1.col('volumn', {
    alias: '成交量(万)',
    tickCount: 2,
  });
  chart1.col('time',{
    type: 'timeCat',
    nice: false,
    mask: 'mm-dd',
    alias: '时间',
    tickCount: 10
  });
  chart1.axis('time', false);
  chart1.axis('volumn', {
    title: {
      textAlign: 'center'
    },
    formatter: function(val) {
      return parseInt(val / 1000, 10) + 'k';
    }
  });
  chart1.interval()
        .position('time*volumn')
        .color('trend', ['#2AF483','#F80041'])
        .tooltip('volumn');
  chart1.legend('trend', false);
  var slider = new Slider({
    domId: 'slider',
    height: 30,
    charts: [chart, chart1],
    xDim: 'time',
    yDim: 'max'
  });
  slider.render();      
});
const KXian = React.createClass({
  getInitialState() {
    return {
      data: [],
      forceFit: true,
      width: 500,
      height: 250,
      plotCfg: {
        margin: [60, 120, 30],
        background: {
          fill: '#191821'
        }
      }
    };
  },
  componentDidMount: function() {
    const self = this;
//    axios.get('../../../static/data/candleSticks.json').then(function (response) {
      // 创建数据源
      var data = [
        {"time":"2015-11-19","start":8.18,"max":8.33,"min":7.98,"end":8.32},
        {"time":"2015-11-18","start":8.37,"max":8.6,"min":8.03,"end":8.09},
        {"time":"2015-11-17","start":8.7,"max":8.78,"min":8.32,"end":8.37},
        {"time":"2015-11-16","start":8.18,"max":8.69,"min":8.05,"end":8.62},
        {"time":"2015-11-13","start":8.01,"max":8.75,"min":7.97,"end":8.41}
      ];
      var Frame = G2.Frame;
      var frame = new Frame(data);
      frame.addCol('trend', function(obj) {
        return (obj.start <= obj.end) ? 0 : 1;
      });
      self.setState({
        data: frame
      });
    /*}).catch(function (error) {
      console.log(error);
    });*/
  },
  render() {
    var data = this.state.data;
    if (data instanceof G2.Frame) {
      data = data.toJSON();
    }
    if (data.length === 0) {
      return (<div></div>);
    } else {
      return (
        <div>
          <Chart
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
            plotCfg={this.state.plotCfg}
            forceFit={this.state.forceFit} />
        </div>
      );
    }
  },
});