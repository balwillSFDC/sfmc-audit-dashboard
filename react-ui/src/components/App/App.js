import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrandBand, Button } from '@salesforce/design-system-react';
import Appheader from '../AppHeader/AppHeader';
import AccountActivity from '../AccountActivity/AccountActivity';
import { BrowserRouter, Route } from 'react-router-dom';

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
        <BrowserRouter>
          <BrandBand
            id="brand-band-lightning-blue"
            className="slds-p-around_small"
            theme="lightning-blue"
          >
            <Appheader />
            <AccountActivity />
          </BrandBand>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
