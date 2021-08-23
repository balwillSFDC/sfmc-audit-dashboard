import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
  changeEmailActivitySelected,
  clearEmailActivitySelected 
} from '../../stateManagement/actions';


const mapStateToProps = (state) => {
  return {
    eventDataJob: state.eventDataJob,
    eventData: state.eventData,
    eventDataJobState: state.eventDataJobState,
    emailActivitySelected: state.emailActivitySelected
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}



class EmailActivityTile extends Component {
  constructor(props) {
    super(props) 
  }


  handleSelection = () => {
    if (this.props.emailActivity === this.props.emailActivitySelected) {
      this.props.dispatch(clearEmailActivitySelected())
    } else {
      this.props.dispatch(changeEmailActivitySelected(this.props.emailActivity))
    }
  }
  
  render() {
    let label;
    let eventDataSelection;
    let eventDataCount;

    switch(this.props.emailActivity) {
      case 'sends':
        label = 'Sends'
        eventDataSelection = 'sendData'
        eventDataCount = this.props.eventData.sendData.length
        break;

      case 'opens':
        label = 'Opens'
        eventDataSelection = 'openData'
        eventDataCount = this.props.eventData.openData.length
        break;

      case 'bounces':
        label = 'Bounces'
        eventDataSelection = 'bounceData'
        eventDataCount = this.props.eventData.bounceData.length
        break;

      case 'clicks':
        label = 'Clicks'
        eventDataSelection = 'clickData'
        eventDataCount = this.props.eventData.clickData.length
        break;

      case 'unsubscribes':
        label = 'Unsubscribes'
        eventDataSelection = 'unsubscribeData'
        eventDataCount = this.props.eventData.unsubscribeData.length
        break;

      default:
    }
    
    return (
      <div className="slds-col slds-p-horizontal_small emailActivity-card">
        <div className="slds-box EmailActivityCard" onClick={this.handleSelection}>
          <div className="slds-text-title_caps slds-text-align_center">
            <b>{label}</b>
          </div>
          
            <div className="slds-text-heading_medium slds-text-align_center">
              <div className="slds-text-heading_large slds-text-align_center">
                {eventDataCount}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityTile);
