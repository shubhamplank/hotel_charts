import React from "react";
import hotelData from "./hotel.json";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.ratings).some(elem => {
        return this.props.ratings[elem] !== prevProps[elem];
      })
    ) {
      this.drawChart();
    }
  }

  componentDidMount() {
    window.google.charts.load("current", {
      packages: ["map"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyCw2J1_-7f4ww95qOQu0pfbebuR84IFBxc"
    });
    window.google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    const { ratings } = this.props;
    let data = window.google.visualization.arrayToDataTable([
      ["Lat", "Long", "Name", "Marker"],
      ...hotelData
        .filter(elem => ratings[elem.rating])
        .map(elem => [
          Number(elem.latitude),
          Number(elem.longitude),
          `${elem.name}(${elem.rating})`,
          `${Number(elem.rating) - 1}`
        ])
    ]);

    let options = {
      showTooltip: true,
      icons: {
        ...Array(10)
          .fill()
          .reduce((acc, elem, index) => {
            acc[index] = {
              normal: `./images/marker-${index}.png`,
              selected: `./images/marker-${index}.png`
            };
            return acc;
          }, {})
      }
    };

    let map = new window.google.visualization.Map(
      document.getElementById("hotels")
    );
    map.draw(data, options);
  }
  render() {
    return (
      <div>
        <div id="hotels" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
}
