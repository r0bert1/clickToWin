import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: null };
  }

  componentDidMount = () => {
    const setCounter = async () => {
      const response = await fetch("http://localhost:3001/api/counter");
      const data = await response.json();
      this.setState({ counter: data.counter });
    };
    setCounter();
  };

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <button>Click me!</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
