import React from "react";
import ReactDOM from "react-dom";
import Filter from "./filters.jsx";
import Bar from "./bar.jsx";
import Map from "./map.jsx";
import { saveAs } from "file-saver";
import "./styles.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

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
       
        <BrowserRouter>
          <div>
            <ul>
              
                <Link to="/Bar">Bar   </Link> &nbsp;&nbsp;&nbsp;&nbsp;  
              
                <Link to="/Map">Map</Link>
             
            </ul>
            <hr />
            <Route
              path="/Bar"
              render={props => <Bar {...props} ratings={ratings} />}
            />
            <Route
              path="/Map"
              render={props => <Map {...props} ratings={ratings} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
