import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: null };
  }

  componentDidMount = () => {
    const setCounter = async () => {
      const response = await fetch('/api/counter');
      const data = await response.json();
      this.setState({ counter: data.counter });
    };
    setCounter();
  };

  handleClick = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    const { counter } = this.state;
    return (
      <div>
        <p>{counter}</p>
        <button type="button" onClick={this.handleClick}>
          Click me!
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
