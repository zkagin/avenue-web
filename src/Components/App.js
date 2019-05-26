import React from "react";
import Game from "./Game";
import "./styles.css";
import { Cookies, withCookies } from "react-cookie";
import { instanceOf } from "prop-types";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.onCompletedLevel = this.onCompletedLevel.bind(this);
    this.state = {
      level: parseInt(cookies.get("maxLevel")) || 3
    };
  }

  onCompletedLevel() {
    const { cookies } = this.props;
    cookies.set("maxLevel", this.state.level + 1);
    this.setState({
      level: this.state.level + 1
    });
  }

  render() {
    return (
      <div className="App">
        <Game
          level={this.state.level}
          onCompletedLevel={this.onCompletedLevel}
          key={this.state.level}
        />
      </div>
    );
  }
}

export default withCookies(App);
