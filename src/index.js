import React from "react";
import ReactDOM from "react-dom";
import Filter from "./filters.jsx";
import Bar from "./bar.jsx";
import Map from "./map.jsx";
import { saveAs } from "file-saver";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: Array(10)
        .fill(0)
        .reduce((acc, elem, ind) => {
          acc[ind + 1] = true;
          return acc;
        }, {})
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(index) {
    return e => {
      const newRatings = { ...this.state.ratings };
      newRatings[index] = e.target.checked;
      this.setState({
        ratings: newRatings
      });
    };
  }

  render() {
    const { ratings } = this.state;
    return (
      <div className="App">
        <Filter onChange={this.onChange} ratings={ratings} />
        <Bar ratings={ratings} />
        <Map ratings={ratings} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
