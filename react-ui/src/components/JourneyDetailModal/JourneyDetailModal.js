import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IconSettings,
  Modal
} from '@salesforce/design-system-react';
import { toggleJourneyDetailModal } from '../../stateManagement/actions';

const mapStateToProps = (state) => ({
  isOpenJourneyDetailModal: state.isOpenJourneyDetailModal,
  journeyDetailSelected: state.journeyDetailSelected
})

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export class JourneyDetailModal extends Component {


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
