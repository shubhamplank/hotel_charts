import React from "react";

export default function markers() {
  return (
    <div class="container">
      {Array(10)
        .fill(0)
        .map((elem, index) => (
          <div
            style={{
              width: (index + 1) * 2 + 10,
              height: (index + 1) * 2 + 10,
              opacity: 1 - index * 0.06
            }}
            className="markers"
            id={`marker-${index}`}
          />
        ))}
    </div>
  );
}
