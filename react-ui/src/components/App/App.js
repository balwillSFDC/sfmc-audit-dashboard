import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrandBand, Button } from '@salesforce/design-system-react';
import Appheader from '../AppHeader/AppHeader';
import EmailActivity from '../EmailActivity/EmailActivity';
import { BrowserRouter, Route } from 'react-router-dom';
import AccountInventory from '../AccountInventory/AccountInventory';
import AccountInventoryDetails from '../AccountInventoryDetails/AccountInventoryDetails'
import EmailActivityDetails from '../EmailActivityDetails/EmailActivityDetails'

const mapStateToProps = (state) => {
  return {
    accountInventorySelected: state.accountInventorySelected,
    emailActivitySelected: state.emailActivitySelected
    // ...
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class App extends React.Component {
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
            <Route path="/">
              <EmailActivity />
              { this.props.emailActivitySelected && <EmailActivityDetails />  }

              <AccountInventory />
              { this.props.accountInventorySelected && <AccountInventoryDetails />  }
            </Route>

            
          </BrandBand>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
