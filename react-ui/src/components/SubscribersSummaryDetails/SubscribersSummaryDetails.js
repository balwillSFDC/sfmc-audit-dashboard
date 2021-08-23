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
import '../SubscribersSummaryDetails/SubscribersSummaryDetails.css'
import toTitleCase from 'titlecase'

const mapStateToProps = (state) => {
  return {
    subscribersSummarySelected: state.subscribersSummarySelected,
    subscribers: state.subscribers
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class SubscribersSummaryDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      items: [],    // gets updated by handleChangingSelection()
      columns: [],  // gets updated by handleChangingSelection()
    };
  }

  isLoading = false;
  page = 0;


  componentDidMount() {
    this.handleChangingSelection()
  }

  componentDidUpdate(prevProps, prevState) {
    // if this.props.subscribersSummarySelected changes...
    if (prevProps.subscribersSummarySelected !== this.props.subscribersSummarySelected) {
      this.handleChangingSelection()
    }
  }

  handleChangingSelection = () => {
    let subscribersSummaryDetails = [];
    let columns;
    
    switch(this.props.subscribersSummarySelected) {
      case 'All Subscribers':
        this.props.subscribers.allSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            subscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='emailAddress' label='Email Address' property='emailAddress' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        break;

      case 'Duplicate Subscribers':    
        this.props.subscribers.duplicateSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            subscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='emailAddress' label='Email Address' property='emailAddress' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        break;

      case 'Active Subscribers':
        this.props.subscribers.activeSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            subscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='emailAddress' label='Email Address' property='emailAddress' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        break;

      case 'Unsubscribed Subscribers':
        this.props.subscribers.unsubscribedSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            subscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='emailAddress' label='Email Address' property='emailAddress' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        break;
      
      case 'Bounced Subscribers':
        this.props.subscribers.bouncedSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            subscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='subscriberKey' label='Subscriber Key' property='subscriberKey' />,
          <DataTableColumn key='emailAddress' label='Email Address' property='emailAddress' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]
      } 

    this.setState({ items: subscribersSummaryDetails, columns})
  }

  render() {
    return (
      <div>

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
                        {toTitleCase(this.props.subscribersSummarySelected)}
                      </div>
                      <div className="slds-text-align_right">
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
      </div> 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersSummaryDetails);
