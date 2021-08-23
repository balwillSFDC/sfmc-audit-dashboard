import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  addSubscribersJob, 
  updateSubscribersJob
 } from '../../stateManagement/actions';
import { 
  IconSettings,
  PageHeader,
  Icon,
  Card,
  Button,
  MediaObject
} from '@salesforce/design-system-react';
import SubscribersSummaryTile from '../SubscribersSummaryTile/SubscribersSummaryTile';


const mapStateToProps = (state) => {
  return {
    subscribersJob: state.subscribersJob,
    subscribers: state.subscribers,
    subscribersJobState: state.subscribersJobState
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};


class SubscribersSummary extends Component {
  constructor(props) {
    super(props)

  }
  
  componentDidMount() {
    if (this.props.subscribersJobState !== 'completed') {
      this.props.dispatch(addSubscribersJob());

      setInterval(() => {
        if (this.props.subscribersJobState !== 'completed') {
          this.props.dispatch(updateSubscribersJob(this.props.subscribersJob));
        } 
      }, 2000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.subscribersJobState === 'completed' && this.props.subscribersJobState !== 'completed') {
      setInterval(() => {
        if (this.props.subscribersJobState !== 'completed') {
          this.props.dispatch(updateSubscribersJob(this.props.subscribersJob));
        }
      }, 2000);
    }
  }

  handleRefresh = () => {
    this.props.dispatch(addSubscribersJob());
  }


  render() {
    let info;
    
    if (this.props.subscribersJobState !== 'completed') {
      info = (
        <div className="slds-text-color_weak">
          Retrieving results...
        </div>
      )
    } else {
      info = (
        <div className="slds-text-color_success">
          Finished - Results retrieved! 
        </div>
      )
    }

    return (
      <> 
        <IconSettings iconPath='/icons/'>
          <div className='slds-grid slds-grid_vertical'>
            <Card
              id='ExampleCard'
              heading='Subscribers Summary'
              headerActions={
                <Button label="Refresh" onClick={this.handleRefresh} /> 
              }
              header={
                <MediaObject 
                  body={
                    <>
                      <div className='slds-text-heading_medium'>
                        Subscribers Summary
                      </div>
                      {info}
                    </>
                  }
                  figure={<Icon category="standard" name="people" size="medium" />}
                  verticalCenter
                />
              }
            >
              <div className="slds-grid slds-gutter emailActivity-wrapper">
                <SubscribersSummaryTile 
                  label='All Subscribers'   
                  count={this.props.subscribers.allSubscribers.length}
                />
                <SubscribersSummaryTile 
                  label='Duplicate Subscribers' 
                  count={this.props.subscribers.duplicateSubscribers.length} 
                />
                <SubscribersSummaryTile 
                  label='Active Subscribers' 
                  count={this.props.subscribers.activeSubscribers.length}  
                />
                <SubscribersSummaryTile 
                  label='Bounced Subscribers'   
                  count={this.props.subscribers.bouncedSubscribers.length}
                />
                <SubscribersSummaryTile 
                  label='Unsubscribed Subscribers'
                  count={this.props.subscribers.unsubscribedSubscribers.length} 
                />
              </div>
            </Card>
          </div>
        </IconSettings>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersSummary)