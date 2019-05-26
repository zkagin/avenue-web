import React from "react";
import "./styles.css";

function Square(props) {
  return (
    <div
      className={
        "Square" +
        (props.selected ? " selected" : "") +
        (props.answer ? " answer" : "")
      }
      style={{
        width: props.dimension - 0.1 + "rem",
        height: props.dimension - 0.1 + "rem",
        lineHeight: props.dimension + "rem",
        fontSize: props.dimension * 6,
        backgroundColor: color(props.value)
      }}
    >
      {props.isEnd ? "End" : props.value}
    </div>
  );
}

function color(value) {
  const colorRed = 200 - value * 15;
  const colorGreen = 200 - value * 15;
  const colorBlue = 270 - value * 15;
  return "rgb(" + colorRed + "," + colorGreen + "," + colorBlue + ")";
}

export default Square;
