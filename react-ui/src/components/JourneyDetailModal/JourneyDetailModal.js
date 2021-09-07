import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IconSettings,
  Modal
} from '@salesforce/design-system-react';
import { 
  toggleJourneyDetailModal,
  addGetJourneyAuditLogJob,
  updateJourneyAuditLog
} from '../../stateManagement/actions';

const mapStateToProps = (state) => ({
  isOpenJourneyDetailModal: state.isOpenJourneyDetailModal,
  journeyDetailSelected: state.journeyDetailSelected,
  journeys: state.journeys,
  journeyAuditLog: state.journeyAuditLog,
  journeyAuditLogJob: state.journeyAuditLogJob,
  journeyAuditLogJobState: state.journeyAuditLogJobState
})

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export class JourneyDetailModal extends Component {

  componentDidMount() {

    let journeyIdSelected = this.props.journeys.items.filter(journey => journey.name === this.props.journeyDetailSelected)[0].id

    this.props.dispatch(addGetJourneyAuditLogJob(journeyIdSelected))

    let counter = 0
    setInterval(() => {
      if (this.props.journeyAuditLogJobState !== 'completed' && counter < 10) {
        counter++ 
        this.props.dispatch(updateJourneyAuditLog(this.props.journeyAuditLogJob))
      }
    }, 2000)
  }

  render() {
    return (
      <Modal 
        isOpen={this.props.isOpenJourneyDetailModal}
        onRequestClose={() => this.props.dispatch(toggleJourneyDetailModal(!this.props.isOpenJourneyDetailModal))}
        size="large"
        heading={this.props.journeyDetailSelected}
      >
        <p>Hello World!</p>
      </Modal>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(JourneyDetailModal)
