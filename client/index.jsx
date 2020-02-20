import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: socketIOClient(),
      counter: null,
    };
  }

  componentDidMount = () => {
    const { socket } = this.state;
    socket.on('initialize counter', data => this.setState({ counter: data }));
    socket.on('incremented', data => this.setState({ counter: data }));
  };

  handleClick = () => {
    const { socket, counter } = this.state;
    this.setState({ counter: counter + 1 });
    socket.emit('increment');
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
