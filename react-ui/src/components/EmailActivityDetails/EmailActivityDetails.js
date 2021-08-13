import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  DataTable,
  DataTableColumn,
  DataTableCell,
} from '@salesforce/design-system-react';

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
  }


  state = {
		hasMore: true,
    items: []
	};

  isLoading = false;
  page = 0;


  handleChangingSelection = () => {

  }

  handleLoadMore = (emailActivityDetails) => {
		if (!this.isLoading) {
			setTimeout(() => {
				const moreItems = emailActivityDetails.map((item) => {
					const copy = { ...item };
					copy.id += this.page.toString();
					return copy;
				});
				this.page = this.page + 1;
				const items = emailActivityDetails.slice().concat(moreItems) 

				this.setState({ items, hasMore: this.page !== 10 }, () => {
					this.isLoading = false;
				});
			}, 1000);
		}
		this.isLoading = true;
	};



  componentDidUpdate() {
  }

  render() {
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
          <DataTableColumn key='smtpReason' label='SMTP Reason' property='smtpReason' />
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
    
    
    return (
      <div>
        <DataTable 
          items={emailActivityDetails}
          onLoadMore={this.handleLoadMore(emailActivityDetails)}
          fixedHeader
          fixedLayout
        >
          {columns}
        </DataTable>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityDetails);
