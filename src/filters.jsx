import React from "react";

export default class Filter extends React.Component {
  render() {
    const { ratings, onChange } = this.props;
    return (
      <div style={{ display: "flex"}}>
        {Array(10)
          .fill(0)
          .map((elem, index) => (
            <div>
              {index + 1}
              <input
                type="checkbox"
                value={index + 1}
                checked={ratings[index + 1]}
                onChange={onChange(index + 1)}
              />
            </div>
          ))}
      </div>
    );
  }
}
