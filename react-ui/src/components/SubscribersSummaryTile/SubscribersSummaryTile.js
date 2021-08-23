import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
  changeSubscribersSummarySelected,
  clearSubscribersSummarySelected
} from '../../stateManagement/actions';
import '../SubscribersSummaryTile/SubscribersSummaryTile.css'


const mapStateToProps = (state) => {
  return {
    subscribersJob: state.subscribersJob,
    subscribers: state.subscribers,
    subscribersJobState: state.subscribersJobState,
    subscribersSummarySelected: state.subscribersSummarySelected
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}


class SubscribersSummaryTile extends Component {
  constructor(props) {
    super(props) 

  }

  handleSelection = (e) => {
    console.log(e)

    if (this.props.label === this.props.subscribersSummarySelected) {
      this.props.dispatch(clearSubscribersSummarySelected())
    } else {
      this.props.dispatch(changeSubscribersSummarySelected(this.props.label))
    }
  }
  
  render() {    
    return (
      <div className="slds-col slds-p-horizontal_small emailActivity-card">
        <div className="slds-box EmailActivityCard" onClick={this.handleSelection}>
          <div className="slds-text-title_caps slds-text-align_center">
            <b>{this.props.label}</b>
          </div>
          
            <div className="slds-text-heading_medium slds-text-align_center">
              <div className="slds-text-heading_large slds-text-align_center">
                {this.props.count}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersSummaryTile);
