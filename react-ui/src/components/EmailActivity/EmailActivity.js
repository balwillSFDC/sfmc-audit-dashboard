import React from 'react';
import { connect } from 'react-redux';
import {
  IconSettings,
  PageHeader,
  Icon
} from '@salesforce/design-system-react';
import './EmailActivity.css';
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

class emailActivity extends React.Component {
  componentDidMount() {
    this.props.dispatch(addEventDataJob());

    setInterval(() => {
      if (Object.keys(this.props.eventData).length === 0 ) {
        this.props.dispatch(updateEventDataJob(this.props.eventDataJob));
      } 
    }, 2000);
  }

  render() {

    let sendData;
    let openData;
    let bounceData;
    let clickData;
    let unsubscribeData;

    if (Object.keys(this.props.eventData).length > 0) {
      sendData = (
        <div className="slds-text-heading_medium slds-text-align_center">
          {this.props.eventData.sendData.length}
        </div>
      )

      openData = (
        <div className="slds-text-heading_medium slds-text-align_center">
          {this.props.eventData.openData.length}
        </div>
      )

      bounceData = (
        <div className="slds-text-heading_medium slds-text-align_center">
          {this.props.eventData.bounceData.length}
        </div>
      )

      clickData = (
        <div className="slds-text-heading_medium slds-text-align_center">
          {this.props.eventData.clickData.length}
        </div>   
      )

      unsubscribeData = (
        <div className="slds-text-heading_medium slds-text-align_center">
          {this.props.eventData.unsubscribeData.length}
        </div>
      )

    } else {
      sendData = '';
      openData = '';
      bounceData = '';
      clickData = '';
      unsubscribeData = '';
    }

    return (
      <div id="EmailActivity-panel">
        <IconSettings iconPage="/icons/">
          <PageHeader
            icon={<Icon category="standard" />}
            title="Email Activity"
            variant="object-home"
            className="EmailActivityHeader"
          />
        </IconSettings>
        <div className="slds-box slds-theme_default emailActivity-body">
          <div className="slds-grid slds-gutter emailActivity-wrapper">
            <div className="slds-col slds-p-horizontal_small emailActivity-card">
              <div className="slds-box EmailActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Sends</b>
                </div>
                
                  <div className="slds-text-heading_medium slds-text-align_center">
                    { sendData }
                  </div>

              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small emailActivity-card">
              <div className="slds-box EmailActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Opens</b>
                </div>
                
                { openData }
      
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small emailActivity-card">
              <div className="slds-box EmailActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Bounces</b>
                </div>
                
                { bounceData }
                
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small emailActivity-card">
              <div className="slds-box EmailActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Clicks</b>
                </div>

                { clickData }
                
              </div>
            </div>
            <div className="slds-col slds-p-horizontal_small emailActivity-card">
              <div className="slds-box EmailActivityCard">
                <div className="slds-text-heading_small slds-text-align_center">
                  <b>Unsubscribes</b>
                </div>
                
                { unsubscribeData }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(emailActivity);
