import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  DataTable,
  DataTableColumn,
  DataTableCell,
  PageHeader,
  Icon,
  Card,
  Button,
  MediaObject,
  IconSettings
} from '@salesforce/design-system-react';
import {
  addAuditEventsJob,
  updateAuditEventsJob
} from '../../stateManagement/actions'

const mapStateToProps = (state) => {
  return {
    auditEvents: state.auditEvents,
    auditEventsJob: state.auditEventsJob,
    auditEventsJobState: state.auditEventsJobState
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class AuditTrail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    if (this.props.auditEventsJobState === '') {
      this.props.dispatch(addAuditEventsJob())
      
      setInterval(() => {
        if (this.props.auditEventsJobState !== 'completed') {
          this.props.dispatch(updateAuditEventsJob(this.props.auditEventsJob));
        } 
      }, 2000);
    } else {
      this.handleUpdateToAuditEventsProps()
    }
  }

  componentDidUpdate(PrevProps, PrevState) {
    if (PrevProps.auditEventsJobState !== 'completed' && this.props.auditEventsJobState === 'completed' && this.props.auditEvents.items.length > 0) {
      this.handleUpdateToAuditEventsProps()
    }
  }

  handleRefresh = () => {
    this.props.dispatch(addAuditEventsJob());
  }
  

  handleUpdateToAuditEventsProps() {
    let auditTrail = []
    
    this.props.auditEvents.items.forEach(item => {
      auditTrail.push({
        id: item.id,
        memberId: item.memberId,
        createdDate: item.createdDate,
        employee: item.employee.employeeName,
        objectType: item.objectType.name,
        operation: item.operation.name
      })
    })

    this.setState({items: auditTrail})
  }
  
  render() {

    let info;
    
    if (this.props.auditEventsJobState !== 'completed') {
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
                        Audit Trail
                      </div>
                      {info}
                    </>
                  }
                  figure={<Icon category="custom" name="custom91" size="medium" />}
                  verticalCenter
                />
              }
            >
        <DataTable 
          items={this.state.items}
          fixedHeader
          fixedLayout
        >
          <DataTableColumn key='id' label='Id' property='id' />
          <DataTableColumn key='memberId' label='MID' property='memberId' />
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />
          <DataTableColumn key='employee' label='Employee' property='employee' />
          <DataTableColumn key='objectType' label='Object Type' property='objectType' />
          <DataTableColumn key='operation' label='Operation' property='operation' />
        </DataTable>
      </Card>
      </div>
      </IconSettings>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuditTrail);
