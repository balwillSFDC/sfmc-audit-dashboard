import React from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { BrandBand, Button } from '@salesforce/design-system-react';
import Appheader from '../AppHeader/AppHeader';
import EmailActivity from '../EmailActivity/EmailActivity';
import { BrowserRouter, Route } from 'react-router-dom';
import AccountInventory from '../AccountInventory/AccountInventory';
import AccountInventoryDetails from '../AccountInventoryDetails/AccountInventoryDetails'
import EmailActivityDetails from '../EmailActivityDetails/EmailActivityDetails'
import SubscribersSummary from '../SubscribersSummary/SubscribersSummary'
import SubscribersSummaryDetails from '../SubscribersSummaryDetails/SubscribersSummaryDetails';
import AuditTrail from '../AuditTrail/AuditTrail';
import DownloadDataPage from '../DownloadDataPage/DownloadDataPage';
import About from '../About/About';
import JourneyDetailModal from '../JourneyDetailModal/JourneyDetailModal';


const mapStateToProps = (state) => {
  return {
    accountInventorySelected: state.accountInventorySelected,
    emailActivitySelected: state.emailActivitySelected,
    subscribersSummarySelected: state.subscribersSummarySelected,
    isOpenJourneyDetailModal: state.isOpenJourneyDetailModal
    // ...
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
            <Route exact path="/">
              <SubscribersSummary /> 
              { this.props.subscribersSummarySelected && <SubscribersSummaryDetails />  }

              <EmailActivity />
              { this.props.emailActivitySelected && <EmailActivityDetails />  }

              <AccountInventory />
              { this.props.accountInventorySelected && <AccountInventoryDetails />  }
              { this.props.isOpenJourneyDetailModal && <JourneyDetailModal /> }
            </Route>

            <Route exact path='/auditTrail'>
              <AuditTrail /> 
            </Route>

            <Route exact path='/download'>
              <DownloadDataPage /> 
            </Route>

            <Route exact path='/about'>
              <About />
            </Route>
          </BrandBand>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
