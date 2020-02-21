import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = socketIOClient();

    this.state = {
      counter: null,
    };
  }

  componentDidMount() {
    this.socket.on('initialize', data => this.setState({ counter: data }));
    this.socket.on('update', data => this.setState({ counter: data }));
  }

  handleClick = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
    this.socket.emit('increment');
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
