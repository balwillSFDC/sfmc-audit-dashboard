import React from 'react';
import { connect } from 'react-redux';
import {
  IconSettings,
  PageHeader,
  Icon
} from '@salesforce/design-system-react';
import './AccountActivity.css';
import {
  addEventDataJob,
  updateEventDataJob
} from '../../stateManagement/actions';

const mapStateToProps = (state) => {
  return {
    eventDataJob: state.eventDataJob,
    eventData: state.eventData
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class AccountActivity extends React.Component {
  componentDidMount() {
    this.props.dispatch(addEventDataJob());

    setInterval(() => {
      if (
        Object.keys(this.props.eventData).length === 0 &&
        this.props.eventDataJob != 0
      ) {
        this.props.dispatch(updateEventDataJob(this.props.eventDataJob));
      }
    }, 2000);
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
                  {this.props.eventData.sendData.length}
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Opens</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  {this.props.eventData.openData.length}
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Bounces</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  {this.props.eventData.bounceData.length}
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Clicks</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  {this.props.eventData.clickData.length}
                </div>
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small accountActivity-card">
              <div className="slds-box AccountActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Unsubscribes</b>
                </div>
                <div className="slds-text-heading_medium slds-text-align_center">
                  {this.props.eventData.unsubscribeData.length}
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
