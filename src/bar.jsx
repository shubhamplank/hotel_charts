import React from "react";
import hotelData from "./hotel.json";
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');

const RATINGS = 10;
export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.onChartReady = this.onChartReady.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.ratings).some(elem => {
        return this.props.ratings[elem] !== prevProps[elem];
      })
    ) {
      this.chartInstance.setOption(this.getGraphData());
    }
  }
  getGraphData() {
    const { ratings } = this.props;
    const count = Array(RATINGS).fill(0);
    hotelData.forEach(data => count[Number(data.rating) - 1]++);
    return {
      tooltip: {},
      xAxis: {
        type: "category",
        data: Object.keys(ratings).filter(elem => ratings[elem])
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: count.filter((elem, index) => ratings[index + 1]),
          type: "bar"
        }
      ]
    };
  }

  onChartReady(charInstance) {
    this.chartInstance = charInstance;
  }
  render() {
    const options = this.getGraphData();
    return <ReactEcharts onChartReady={this.onChartReady} option={options} />;
  }
}
