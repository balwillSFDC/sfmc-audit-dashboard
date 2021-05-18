import React from 'react';
import { connect } from 'react-redux';
import {
  IconSettings,
  PageHeader,
  Icon
} from '@salesforce/design-system-react';
import './AccountActivity.css';

const mapStateToProps = (state) => {
  return {
    sends: {
      count: 1000
    },
    bounces: {
      count: 100
    },
    opens: {
      count: 100
    },
    clicks: {
      count: 100
    },
    unsubscribes: {
      count: 100
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class AccountActivity extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="AccountActivity-panel">
        <IconSettings iconPage="/icons/">
          <PageHeader
            icon={<Icon category="standard" />}
            title="Account Activity"
            variant="object-home"
            className="AccountActivityHeader"
          />
        </IconSettings>
        <div className="slds-box slds-theme_default accountActivity-body">
          <div className="slds-grid slds-gutter accountActivity-wrapper">
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Sends</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  1000
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Opens</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  1000
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Bounces</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  1000
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Clicks</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  1000
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Unsubscribes</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  1000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivity);
