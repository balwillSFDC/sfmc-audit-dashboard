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
  MediaObject,
  CardFilter,
  CardEmpty
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


const WrappedDataTableCell = ({ children, ...props }) => (
  <DataTableCell {...props} >
    <td class="slds-cell-wrap" >{children}</td>
  </DataTableCell>
);

WrappedDataTableCell.displayName = DataTableCell.displayName;


class EmailActivityDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      items: [],    // gets updated by handleChangingSelection()
      columns: [],  // gets updated by handleChangingSelection()
      label: '',
      isFiltering: false
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
            SendID: item.SendID,
            listId: item.PartnerProperties.Value,
            SubscriberKey: item.SubscriberKey,
            EventDate: item.EventDate,
            EventType: item.EventType,
            TriggeredSendDefinitionObjectID: item.TriggeredSendDefinitionObjectID,
            BatchID: item.BatchID 
          })
        });
  
        columns = [
          <DataTableColumn key='SendID' label='Send Id' property='SendID' />,
          <DataTableColumn key='listId' label='List Id' property='listId' />,
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EventDate' label='Event Date' property='EventDate' />,
          <DataTableColumn key='EventType' label='Event Type' property='EventType' />,
          <DataTableColumn key='TriggeredSendDefinitionObjectID' label='Triggered Send Definition Object Id' property='TriggeredSendDefinitionObjectID' />,
          <DataTableColumn key='BatchID' label='Batch Id' property='BatchID' />
        ]

        break;

      case 'opens':    
        this.props.eventData.openData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            SendID: item.SendID,
            SubscriberKey: item.SubscriberKey,
            EventDate: item.EventDate,
            EventType: item.EventType,
            TriggeredSendDefinitionObjectID: item.TriggeredSendDefinitionObjectID,
            BatchID: item.BatchID 
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='SendID' label='Send Id' property='SendID' />,
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EventDate' label='Event Date' property='EventDate' />,
          <DataTableColumn key='EventType' label='Event Type' property='EventType' />,
          <DataTableColumn key='TriggeredSendDefinitionObjectID' label='Triggered Send Definition Object Id' property='TriggeredSendDefinitionObjectID' />,
          <DataTableColumn key='BatchID' label='Batch Id' property='BatchID' />
        ]

        break;

      case 'bounces':
        this.props.eventData.bounceData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            SendID: item.SendID,
            SubscriberKey: item.SubscriberKey,
            EventDate: item.EventDate,
            EventType: item.EventType,
            TriggeredSendDefinitionObjectID: item.TriggeredSendDefinitionObjectID,
            BatchID: item.BatchID, 
            smtpCode: item.SMTPCode,
            bounceCategory: item.BounceCategory,
            smtpReason: item.SMTPReason
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='SendID' label='Send Id' property='SendID' />,
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EventDate' label='Event Date' property='EventDate' />,
          <DataTableColumn key='EventType' label='Event Type' property='EventType' />,
          <DataTableColumn key='TriggeredSendDefinitionObjectID' label='Triggered Send Definition Object Id' property='TriggeredSendDefinitionObjectID' />,
          <DataTableColumn key='BatchID' label='Batch Id' property='BatchID' />,
          <DataTableColumn key='smtpCode' label='SMTP Code' property='smtpCode' />,
          <DataTableColumn key='bounceCategory' label='Bounce Category' property='bounceCategory' />,
          <DataTableColumn key='smtpReason' label='SMTP Reason' property='smtpReason'>
            <WrappedDataTableCell /> 
          </DataTableColumn> 
        ]

        break;

      case 'clicks':

        this.props.eventData.clickData.forEach(item => {
          emailActivityDetails.push({
            Id: item.ID,
            SendID: item.SendID,
            SubscriberKey: item.SubscriberKey,
            EventDate: item.EventDate,
            EventType: item.EventType,
            TriggeredSendDefinitionObjectID: item.TriggeredSendDefinitionObjectID
          })
        });
  
        columns = [
          <DataTableColumn key='Id' label='Id' property='Id' />,
          <DataTableColumn key='SendID' label='Send Id' property='SendID' />,
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EventDate' label='Event Date' property='EventDate' />,
          <DataTableColumn key='EventType' label='Event Type' property='EventType' />,
          <DataTableColumn key='TriggeredSendDefinitionObjectID' label='Triggered Send Definition Object Id' property='TriggeredSendDefinitionObjectID' />
        ]

        break;
      
      case 'unsubscribes':
        this.props.eventData.unsubscribeData.forEach(item => {
          emailActivityDetails.push({
            ID: item.ID,
            SendID: item.SendID,
            SubscriberKey: item.SubscriberKey,
            EventDate: item.EventDate,
            EventType: item.EventType,
            TriggeredSendDefinitionObjectID: item.TriggeredSendDefinitionObjectID
          })
        });
  
        columns = [
          <DataTableColumn key='ID' label='Id' property='ID' />,
          <DataTableColumn key='SendID' label='Send Id' property='SendID' />,
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EventDate' label='Event Date' property='EventDate' />,
          <DataTableColumn key='EventType' label='Event Type' property='EventType' />,
          <DataTableColumn key='TriggeredSendDefinitionObjectID' label='Triggered Send Definition Object Id' property='TriggeredSendDefinitionObjectID' />
        ]
      } 

    this.setState({ items: emailActivityDetails, columns})
  }

  handleFilterChange = (event) => {
    let filteredItems;
    let isFiltering = event.target.value ? true : false


    switch (this.props.emailActivitySelected) {
      case 'sends':     
        filteredItems = this.props.eventData.sendData.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'opens':
        filteredItems = this.props.eventData.openData.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'bounces':
        filteredItems = this.props.eventData.bounceData.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'clicks':
        filteredItems = this.props.eventData.clickData.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'unsubscribes':
        filteredItems = this.props.eventData.unsubscribeData.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
    }

		this.setState({ isFiltering, items: filteredItems });
	};

  
  render() {
    const isEmpty = this.state.items.length === 0;

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
                  </div>
                }
                verticalCenter
              />
            }
            filter={
                (!isEmpty || this.state.isFiltering) && (
                  <CardFilter 
                    onChange={this.handleFilterChange} 
                    placeholder='Search By Subscriber Key'
                  />
                )
            }
            headerActions={
                <div className="slds-text-align_right">
                  {`${this.state.items.length} items`}
                </div>
            }
            empty={
                isEmpty ? (
                  <CardEmpty heading="No Items" />
                ) : null
            }
          >
          <DataTable 
            items={this.state.items}

          >
            {this.state.columns}
          </DataTable>
        </Card>
      </div>
    </IconSettings>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityDetails);
