import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Button } from '@salesforce/design-system-react';

const mapStateToProps = (state) => {
  return {
    value_1: state.value_1,
    value_2: state.value_2,
    value_3: state.value_3
    // ...
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Welcome! This is a clean CRA for web app development</p>
        </header>
        <Button label="Hello" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
