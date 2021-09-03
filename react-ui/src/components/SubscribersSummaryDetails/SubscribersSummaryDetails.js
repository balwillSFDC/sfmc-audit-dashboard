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
import '../SubscribersSummaryDetails/SubscribersSummaryDetails.css'
import toTitleCase from 'titlecase'
import filter from '@salesforce/design-system-react/lib/components/combobox/filter';

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
      isFiltering: false,
      handleFilterChange: null,
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
    let handleFilterChange;
    
    switch(this.props.subscribersSummarySelected) {
      case 'All Subscribers':
        this.props.subscribers.allSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            SubscriberKey: item.SubscriberKey,
            EmailAddress: item.EmailAddress,
            CreatedDate: item.CreatedDate,
            Status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EmailAddress' label='Email Address' property='EmailAddress' />,
          <DataTableColumn key='CreatedDate' label='Created Date' property='CreatedDate' />,
          <DataTableColumn key='Status' label='Status' property='Status' />,
        ]

        break;

      case 'Duplicate Subscribers':    
        this.props.subscribers.duplicateSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            SubscriberKey: item.SubscriberKey,
            EmailAddress: item.EmailAddress,
            CreatedDate: item.CreatedDate,
            Status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EmailAddress' label='Email Address' property='EmailAddress' />,
          <DataTableColumn key='CreatedDate' label='Created Date' property='CreatedDate' />,
          <DataTableColumn key='Status' label='Status' property='Status' />,
        ]

        break;

      case 'Active Subscribers':
        this.props.subscribers.activeSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            SubscriberKey: item.SubscriberKey,
            EmailAddress: item.EmailAddress,
            CreatedDate: item.CreatedDate,
            Status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EmailAddress' label='Email Address' property='EmailAddress' />,
          <DataTableColumn key='CreatedDate' label='Created Date' property='CreatedDate' />,
          <DataTableColumn key='Status' label='Status' property='Status' />,
        ]

        break;

      case 'Unsubscribed Subscribers':
        this.props.subscribers.unsubscribedSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            SubscriberKey: item.SubscriberKey,
            EmailAddress: item.EmailAddress,
            CreatedDate: item.CreatedDate,
            Status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EmailAddress' label='Email Address' property='EmailAddress' />,
          <DataTableColumn key='CreatedDate' label='Created Date' property='CreatedDate' />,
          <DataTableColumn key='Status' label='Status' property='Status' />,
        ]

        break;
      
      case 'Bounced Subscribers':
        this.props.subscribers.bouncedSubscribers.forEach(item => {
          subscribersSummaryDetails.push({
            SubscriberKey: item.SubscriberKey,
            emailAddress: item.EmailAddress,
            createdDate: item.CreatedDate,
            status: item.Status
          })
        });


        columns = [
          <DataTableColumn key='SubscriberKey' label='Subscriber Key' property='SubscriberKey' />,
          <DataTableColumn key='EmailAddress' label='Email Address' property='EmailAddress' />,
          <DataTableColumn key='CreatedDate' label='Created Date' property='CreatedDate' />,
          <DataTableColumn key='Status' label='Status' property='Status' />,
        ]
      } 

    this.setState({ items: subscribersSummaryDetails, columns, handleFilterChange})
  }

  handleFilterChange = (event) => {
    let filteredItems;
    let isFiltering = event.target.value ? true : false


    switch (this.props.subscribersSummarySelected) {
      case 'All Subscribers':     
        filteredItems = this.props.subscribers.allSubscribers.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'Duplicate Subscribers':
        filteredItems = this.props.subscribers.duplicateSubscribers.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'Active Subscribers':
        filteredItems = this.props.subscribers.activeSubscribers.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'Bounced Subscribers':
        filteredItems = this.props.subscribers.bouncedSubscribers.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
      case 'Unsubscribed Subscribers':
        filteredItems = this.props.subscribers.unsubscribedSubscribers.filter((item) =>
          RegExp(event.target.value, 'i').test(item.SubscriberKey)
        );      
        break;
    }

		this.setState({ isFiltering, items: filteredItems });
	};

  render() {
    const isEmpty = this.state.items.length === 0;


    return (
      <div>

        <IconSettings iconPath='/icons/'>
          <div className='slds-grid slds-grid_vertical'>
            <Card
              id='subscribersSummaryDetails_Card'
              heading='Subscribers Summary'
              headerActions={
                <div className="slds-text-align_right">
                  {`${this.state.items.length} items`}
                </div>
              }
              filter={
                (!isEmpty || this.state.isFiltering) && (
                  <CardFilter 
                    onChange={this.handleFilterChange} 
                    placeholder='Search By Subscriber Key'
                  />
                )
              }
              header={
                <MediaObject 
                  body={
                    <div className='slds-grid slds-grid_align-spread'>
                      <div className='slds-text-heading_small'>
                        {toTitleCase(this.props.subscribersSummarySelected)}
                      </div>

                    </div>
                  }
                  verticalCenter
                />
              }
              empty={
                isEmpty ? (
                  <CardEmpty heading="No Items" />
                ) : null
              }
            >
              {console.log(this.state.items)}
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
