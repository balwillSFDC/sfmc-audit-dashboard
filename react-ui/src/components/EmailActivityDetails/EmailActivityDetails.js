import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  DataTable,
  DataTableColumn,
  DataTableCell,
  PageHeader,
  Icon,
  IconSettings,
  Card,
  MediaObject
} from '@salesforce/design-system-react';
import { clearEmailActivitySelected } from '../../stateManagement/actions';
import toTitleCase from 'titlecase'
import '../EmailActivityDetails/EmailActivityDetails.css'

const mapStateToProps = (state) => {
  return {
    emailActivitySelected: state.emailActivitySelected,
    eventData: state.eventData
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class EmailActivityDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      items: [],    // gets updated by handleChangingSelection()
      columns: [],  // gets updated by handleChangingSelection()
      label: '',

    };
  }

  isLoading = false;
  page = 0;


  componentDidMount() {
    this.handleChangingSelection()
  }

  componentDidUpdate(prevProps, prevState) {
    // if this.props.emailActivitySelected changes...
    if (prevProps.emailActivitySelected !== this.props.emailActivitySelected) {
      this.handleChangingSelection()
    }
  }

  handleChangingSelection = () => {
    let emailActivityDetails = [];
    let columns;
    
    switch(this.props.emailActivitySelected) {
      case 'sends':
        this.props.eventData.sendData.forEach(item => {
          emailActivityDetails.push({
            sendId: item.SendID,
            listId: item.PartnerProperties.Value,
            subscriberKey: item.SubscriberKey,
            eventDate: item.EventDate,
            eventType: item.EventType,
            triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID,
            batchId: item.BatchID 
          })
        });
  
        columns = [
          <DataTableColumn key='sendId' label='Send Id' property='sendId' />,
          <DataTableColumn key='listId' label='List Id' property='listId' />,
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='eventDate' label='Event Date' property='eventDate' />,
          <DataTableColumn key='eventType' label='Event Type' property='eventType' />,
          <DataTableColumn key='triggeredSendDefinitionObjectId' label='Triggered Send Definition Object Id' property='triggeredSendDefinitionObjectId' />,
          <DataTableColumn key='batchId' label='Batch Id' property='batchId' />
        ]

        break;

      case 'opens':    
        this.props.eventData.openData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            sendId: item.SendID,
            subscriberKey: item.SubscriberKey,
            eventDate: item.EventDate,
            eventType: item.EventType,
            triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID,
            batchId: item.BatchID 
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='sendId' label='Send Id' property='sendId' />,
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='eventDate' label='Event Date' property='eventDate' />,
          <DataTableColumn key='eventType' label='Event Type' property='eventType' />,
          <DataTableColumn key='triggeredSendDefinitionObjectId' label='Triggered Send Definition Object Id' property='triggeredSendDefinitionObjectId' />,
          <DataTableColumn key='batchId' label='Batch Id' property='batchId' />
        ]

        break;

      case 'bounces':
        this.props.eventData.bounceData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            sendId: item.SendID,
            subscriberKey: item.SubscriberKey,
            eventDate: item.EventDate,
            eventType: item.EventType,
            triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID,
            batchId: item.BatchID, 
            smtpCode: item.SMTPCode,
            bounceCategory: item.BounceCategory,
            smtpReason: item.SMTPReason
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='sendId' label='Send Id' property='sendId' />,
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='eventDate' label='Event Date' property='eventDate' />,
          <DataTableColumn key='eventType' label='Event Type' property='eventType' />,
          <DataTableColumn key='triggeredSendDefinitionObjectId' label='Triggered Send Definition Object Id' property='triggeredSendDefinitionObjectId' />,
          <DataTableColumn key='batchId' label='Batch Id' property='batchId' />,
          <DataTableColumn key='smtpCode' label='SMTP Code' property='smtpCode' />,
          <DataTableColumn key='bounceCategory' label='Bounce Category' property='bounceCategory' />,
          <DataTableColumn key='smtpReason' label='SMTP Reason' property='smtpReason'>
          </DataTableColumn> 
        ]

        break;

      case 'clicks':

        this.props.eventData.clickData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            sendId: item.SendID,
            subscriberKey: item.SubscriberKey,
            eventDate: item.EventDate,
            eventType: item.EventType,
            triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='sendId' label='Send Id' property='sendId' />,
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='eventDate' label='Event Date' property='eventDate' />,
          <DataTableColumn key='eventType' label='Event Type' property='eventType' />,
          <DataTableColumn key='triggeredSendDefinitionObjectId' label='Triggered Send Definition Object Id' property='triggeredSendDefinitionObjectId' />
        ]

        break;
      
      case 'unsubscribes':
        this.props.eventData.unsubscribeData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            sendId: item.SendID,
            subscriberKey: item.SubscriberKey,
            eventDate: item.EventDate,
            eventType: item.EventType,
            triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='sendId' label='Send Id' property='sendId' />,
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='eventDate' label='Event Date' property='eventDate' />,
          <DataTableColumn key='eventType' label='Event Type' property='eventType' />,
          <DataTableColumn key='triggeredSendDefinitionObjectId' label='Triggered Send Definition Object Id' property='triggeredSendDefinitionObjectId' />
        ]
      } 

    this.setState({ items: emailActivityDetails, columns})
  }

  render() {
    return (


      <IconSettings iconPath='/icons/'>
        <div className='slds-grid slds-grid_vertical'>
          <Card
            id='subscribersSummaryDetails_Card'
            heading='Subscribers Summary'
            header={
              <MediaObject 
                body={
                  <div className='slds-grid slds-grid_align-spread'>
                    <div className='slds-text-heading_small'>
                      {toTitleCase(this.props.emailActivitySelected)}
                    </div>
                    <div class="slds-text-align_right">
                      {`${this.state.items.length} items`}
                    </div>
                  </div>
                }
                verticalCenter
              />
            }
          >
          <DataTable items={this.state.items}>
            {this.state.columns}
          </DataTable>
        </Card>
      </div>
    </IconSettings>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityDetails);
