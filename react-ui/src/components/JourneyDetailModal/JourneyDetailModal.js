import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IconSettings,
  Modal,
  Icon,
  DataTable,
  DataTableColumn,
  Card
} from '@salesforce/design-system-react';
import {
  toggleJourneyDetailModal,
  addGetJourneyAuditLogJob,
  updateJourneyAuditLog,
  addGetJourneyDetailsJob,
  updateJourneyDetails
} from '../../stateManagement/actions';
import '../JourneyDetailModal/JourneyDetailModal.css'

const mapStateToProps = (state) => ({
  isOpenJourneyDetailModal: state.isOpenJourneyDetailModal,
  journeyDetailSelected: state.journeyDetailSelected,
  journeys: state.journeys,
  journeyAuditLog: state.journeyAuditLog,
  journeyAuditLogJob: state.journeyAuditLogJob,
  journeyAuditLogJobState: state.journeyAuditLogJobState,
  journeyDetails: state.journeyDetails,
  journeyDetailsJob: state.journeyDetailsJob,
  journeyDetailsJobState: state.journeyDetailsJobState
})

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export class JourneyDetailModal extends Component {

  componentDidMount() {

    let journeyIdSelected = this.props.journeys.items.filter(journey => journey.name === this.props.journeyDetailSelected)[0].id
    let journeyKeySelected = this.props.journeys.items.filter(journey => journey.name === this.props.journeyDetailSelected)[0].key

    this.props.dispatch(addGetJourneyAuditLogJob(journeyIdSelected))
    this.props.dispatch(addGetJourneyDetailsJob(journeyKeySelected))

    let counter = 0
    setInterval(() => {
      if (
        this.props.journeyAuditLogJobState !== 'completed' &&
        this.props.journeyDetailsJobState !== 'completed' && 
        counter < 10
      ) {
        counter++
        this.props.dispatch(updateJourneyAuditLog(this.props.journeyAuditLogJob))
        this.props.dispatch(updateJourneyDetails(this.props.journeyDetailsJob))
      }
    }, 2000)
  }
  

  render() {
  
    let  auditLogDetailColumns = [
      <DataTableColumn key='action' label='Action' property='action' />,
      <DataTableColumn key='user' label='User' property='user' />,
      <DataTableColumn key='timeStamp' label='Time Stamp' property='timeStamp' />,
    ]

    let activityDetailsColumns = [
      <DataTableColumn key='id' label='Id' property='id' />,
      <DataTableColumn key='key' label='Key' property='key' />,
      <DataTableColumn key='name' label='Name' property='name' />,
      <DataTableColumn key='description' label='Description' property='description' />,
      <DataTableColumn key='type' label='Type' property='type' />,
    ]

    let auditLogDetails = []
    let activityDetails = []


    if (this.props.journeyAuditLogJobState === 'completed') {
      this.props.journeyAuditLog.items.forEach(item => {
        auditLogDetails.push({
          action: item.action,
          user: item.user.name,
          timeStamp: item.timeStamp
        })
      });
    }

    if (this.props.journeyDetailsJobState === 'completed') {
      this.props.journeyDetails.activities.forEach(item => {
        activityDetails.push({
          id: item.id,
          key: item.key,
          name: item.name,
          description: item.description,
          type: item.type
        })
      })
    }
  
    return (
      <Modal
        isOpen={this.props.isOpenJourneyDetailModal}
        onRequestClose={() => this.props.dispatch(toggleJourneyDetailModal(!this.props.isOpenJourneyDetailModal))}
        size="large"
        heading={this.props.journeyDetailSelected}
      >
        <IconSettings iconPath={"/icons/"} >
          <div>
            <Card
              heading="Activities"
            >
              <DataTable 
                items={activityDetails}
                fixedHeader
                fixedLayout
              >
                {activityDetailsColumns}
              </DataTable>
            </Card>

            <Card
              heading="Audit Log History"
            >
              <DataTable 
                items={auditLogDetails}
                fixedHeader
                fixedLayout
              >
                {auditLogDetailColumns}
              </DataTable>
            </Card>

          </div>
          
        </IconSettings>

      </Modal>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(JourneyDetailModal)
