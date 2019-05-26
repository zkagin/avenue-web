import React from "react";
import "./styles.css";
import Square from "./Square";

class Grid extends React.Component {
  render() {
    const squares = [];
    const dimension = 30;
    const square_dimension = dimension / this.props.size;
    for (let y = 1; y <= this.props.size; y++) {
      for (let x = 1; x <= this.props.size; x++) {
        let newSquare = (
          <Square
            key={x + "," + y}
            value={this.props.gameState[y - 1][x - 1]}
            dimension={square_dimension}
            isEnd={x === this.props.size && y === this.props.size}
          />
        );
        for (let coordinate of this.props.history) {
          if (coordinate.x === x && coordinate.y === y) {
            newSquare = React.cloneElement(newSquare, { selected: true });
          }
        }
        if (this.props.optimalPath != null) {
          for (let coordinate of this.props.optimalPath) {
            if (coordinate.x === x && coordinate.y === y) {
              newSquare = React.cloneElement(newSquare, { answer: true });
            }
          }
        }
        squares.push(newSquare);
      }
    }
    return (
      <div
        className="Grid"
        style={{ width: dimension + "rem", height: dimension + "rem" }}
      >
        {squares}
      </div>
    );
  }
}

export default Grid;
