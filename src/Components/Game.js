import React from "react";
import "./styles.css";
import Coordinate from "./Coordinate";
import Grid from "./Grid";
import getOptimalPath from "./Graph";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: [new Coordinate(1, 1)],
      gameState: this.newGameState(this.props.level),
      optimalPath: null
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    const keyCode = event.keyCode;
    if (this.isGameOver() && keyCode === 32) {
      this.setState({
        currentPath: [new Coordinate(1, 1)],
        gameState: this.newGameState(this.props.level),
        optimalPath: null
      });
    } else if (this.isGameOver() || keyCode > 40 || keyCode < 37) return;

    let currentCoordinate = this.state.currentPath.slice(-1)[0];
    let priorCoordinate = this.state.currentPath.slice(-2, -1)[0];
    let newX = currentCoordinate.x;
    let newY = currentCoordinate.y;
    switch (keyCode) {
      case 37: // Left Arrow
        if (newX > 1) newX--;
        break;
      case 38: // Up Arrow
        if (newY > 1) newY--;
        break;
      case 39: // Right Arrow
        if (newX < this.props.level) newX++;
        break;
      case 40: // Down Arrow
        if (newY < this.props.level) newY++;
        break;
      default:
    }

    if (newX === currentCoordinate.x && newY === currentCoordinate.y) {
      // No move (user is at an edge)
    } else if (
      priorCoordinate &&
      newX === priorCoordinate.x &&
      newY === priorCoordinate.y
    ) {
      // Move is going backwards, so undo the move.
      let newPath = this.state.currentPath.slice();
      newPath.pop();
      this.setState({
        currentPath: newPath,
        gameState: this.state.gameState,
        optimalPath: this.state.optimalPath
      });
    } else if (this.isAlreadyInPath(newX, newY)) {
      // Move collides with an existing coordinate.
    } else {
      // Move is going forward.
      let newPath = this.state.currentPath.slice();
      newPath.push(new Coordinate(newX, newY));
      this.setState({
        currentPath: newPath,
        gameState: this.state.gameState,
        optimalPath: this.state.optimalPath
      });
    }

    this.handleGameOver();
  }

  isGameOver() {
    let currentCoordinate = this.state.currentPath.slice(-1)[0];
    return (
      currentCoordinate.x === this.props.level &&
      currentCoordinate.y === this.props.level
    );
  }

  handleGameOver() {
    if (this.isGameOver()) {
      const optimalPathResponse = getOptimalPath(this.state.gameState);
      const currentPathScore = this.getCurrentPathScore();
      if (currentPathScore === optimalPathResponse[1]) {
        this.props.onCompletedLevel();
      } else {
        this.setState({
          currentPath: this.state.currentPath,
          gameState: this.state.gameState,
          optimalPath: optimalPathResponse[0]
        });
      }
    }
  }

  isAlreadyInPath(newX, newY) {
    for (let coordinate of this.state.currentPath) {
      if (newX === coordinate.x && newY === coordinate.y) {
        return true;
      }
    }
    return false;
  }

  newGameState(size) {
    let gameState = [];
    for (let y = 0; y < size; y++) {
      gameState[y] = [];
      for (let x = 0; x < size; x++) {
        gameState[y][x] = Math.floor(Math.random() * 5) + 1;
      }
    }
    return gameState;
  }

  getCurrentPathScore() {
    let score = 0;
    for (let coordinate of this.state.currentPath) {
      score += this.state.gameState[coordinate.y - 1][coordinate.x - 1];
    }
    return score;
  }

  render() {
    const title = this.isGameOver()
      ? "Press Space to try again."
      : "Level " + this.props.level;
    return (
      <div>
        <div id="title">{title}</div>
        <div className="Game">
          <Grid
            size={this.props.level}
            history={this.state.currentPath}
            gameState={this.state.gameState}
            optimalPath={this.state.optimalPath}
          />
        </div>
        <div id="instructions">
          Get to the bottom right corner with the smallest sum of numbers.
          <br />
          Use arrow keys to move.
        </div>
      </div>
    );
  }
}

export default Game;
