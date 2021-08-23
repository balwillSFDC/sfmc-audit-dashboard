import React from 'react'
import { connect } from 'react-redux'
import {
  DataTable,
  DataTableColumn,
  DataTableCell,
  PageHeader,
  IconSettings,
  Card,
  MediaObject
} from '@salesforce/design-system-react';
import toTitleCase from 'titlecase'

const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}


// for some reason state isn't mapping to props...
const mapStateToProps = (state) => {
  return {
    accountInventorySelected: state.accountInventorySelected,
    emailInventory: state.emailInventory,
    templateInventory: state.templateInventory,
    categories: state.categories,
    triggeredSends: state.triggeredSends,
    cloudPages: state.cloudPages,
    dataExtensions: state.dataExtensions,
    filterData: state.filterData,
    queries: state.queries,
    automations: state.automations,
    journeys: state.journeys,
    businessUnits: state.businessUnits,
    accountUsers: state.accountUsers
  };
};

class AccountInventoryDetails extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      items: [],    // gets updated by handleChangingSelection()
      columns: [],  // gets updated by handleChangingSelection()
    }
  }


  componentDidMount() {
    this.handleChangingSelection()
  }

  componentDidUpdate(prevProps, prevState) {
    // if this.props.emailActivitySelected changes...
    if (prevProps.accountInventorySelected !== this.props.accountInventorySelected) {
      this.handleChangingSelection()
    }
  }

  handleChangingSelection() {
    let selectedObjectDetailsList = [];
    let columns;

    switch(this.props.accountInventorySelected) {
      case 'Html Emails':   

        columns = [
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='owner' label='Owner' property='owner' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        this.props.emailInventory.htmlEmailData.items.forEach(item => {
          selectedObjectDetailsList.push({
            customerKey: item.customerKey,
            name: item.name,
            owner: item.owner.name,
            status: item.status.name 
          })
        });

        break;

      case 'Templated Emails':          
        columns = [
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='owner' label='Owner' property='owner' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]
        this.props.emailInventory.templateEmailData.items.forEach(item => {
          selectedObjectDetailsList.push({
            customerKey: item.customerKey,
            name: item.name,
            owner: item.owner.name,
            status: item.status.name 
          })
        });

        break;

      case 'Text Only Emails':   

        columns = [
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='owner' label='Owner' property='owner' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]
    
        this.props.emailInventory.textOnlyEmailData.items.forEach(item => {
          selectedObjectDetailsList.push({
            customerKey: item.customerKey,
            name: item.name,
            owner: item.owner.name,
            status: item.status.name 
          })
        });

        break;

      case 'Templates':   

        columns = [
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]
    
        this.props.templateInventory.items.forEach(item => {
          selectedObjectDetailsList.push({
            customerKey: item.customerKey,
            name: item.name,
            status: item.status.name 
          })
        });

        break;

      case 'Categories':   
      
        columns = [
          <DataTableColumn key='id' label='Id' property='id' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='categoryType' label='Category Type' property='categoryType' />,
          <DataTableColumn key='description' label='Description' property='description' />,
          <DataTableColumn key='parentId' label='Parent Id' property='parentId' />
        ]
      
        this.props.categories.items.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.name,
            id: item.id,
            categoryType: item.categoryType,
            description: item.description,
            parentId: item.parentId
          })
        });
        
        break;

      case 'Triggered Sends':   

        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='description' label='Description' property='description' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='fromName' label='From Name' property='fromName' />,
          <DataTableColumn key='fromAddress' label='From Address' property='fromAddress' />,
          <DataTableColumn key='emailSubject' label='Email Subject' property='emailSubject' />,
          <DataTableColumn key='triggeredSendType' label='Type' property='triggeredSendType' />,
          <DataTableColumn key='triggeredSendStatus' label='Status' property='triggeredSendStatus' />       
        ]

        this.props.triggeredSends.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.Name,
            customerKey: item.CustomerKey,
            description: item.Description,
            createdDate: item.CreatedDate,
            fromName: item.FromName,
            fromAddress: item.FromAddress,
            emailSubject: item.EmailSubject,
            triggeredSendType: item.TriggeredSendType,
            triggeredSendStatus: item.TriggeredSendStatus
          })
        });        
      
        break;

      case 'Cloud Pages':
 
        columns = [
          <DataTableColumn key='id' label='Id' property='id' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='contentType' label='Content Type' property='contentType' />,
          <DataTableColumn key='owner' label='Owner' property='owner' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='status' label='Status' property='status' />
        ]

        this.props.cloudPages.items.forEach(item => {
          selectedObjectDetailsList.push({
            id: item.id,
            name: item.name,
            customerKey: item.customerKey,
            contentType: item.contentType,
            owner: item.owner.name,
            createdDate: item.createdDate,
            status: item.status.name
          })
        });

        break;

      case 'Data Extensions':   

        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='owner' label='Owner' property='owner' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='isSendable' label='Is Sendable?' property='isSendable' />,
          <DataTableColumn key='isTestable' label='Is Testable?' property='isTestable' />,
          <DataTableColumn key='rowBasedRetention' label='Row Based Retention' property='rowBasedRetention' />,
          <DataTableColumn key='resetRetentionPeriodOnImport' label='Reset Retention Period On Import' property='resetRetentionPeriodOnImport' />,
          <DataTableColumn key='deleteAtEndOfRetentionPeriod' label='Delete At End Of Retention Period' property='deleteAtEndOfRetentionPeriod' />,
          <DataTableColumn key='retainUntil' label='Retain Until' property='retainUntil' />,
          <DataTableColumn key='status' label='Status' property='status' />
        ]

        this.props.dataExtensions.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.Name,
            customerKey: item.CustomerKey,
            owner: item.Owner,
            createdDate: item.CreatedDate,
            isSendable: item.IsSendable,
            isTestable: item.IsTestable,
            rowBasedRetention: item.RowBasedRetention,
            resetRetentionPeriodOnImport: item.ResetRetentionPeriodOnImport,
            deleteAtEndOfRetentionPeriod: item.DeleteAtEndOfRetentionPeriod,
            retainUntil: item.RetainUntil,
            status: item.Status
          })
        });
        
        break;

      case 'Filters':   
        
        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='dataSourceName' label='Data Source Name' property='dataSourceName' />,
          <DataTableColumn key='dataSourceCustomerKey' label='Data Source Customer Key' property='dataSourceCustomerKey' />
        ]

        this.props.filterData.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.Name,
            customerKey: item.CustomerKey,
            createdDate: item.CreatedDate,
            dataSourceName: item.DataSource.Name,
            dataSourceCustomerKey: item.DataSource.CustomerKey
          })
        });

        break;
      
      case 'Queries':   

        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='targetType' label='Target Type' property='targetType' />,
          <DataTableColumn key='targetUpdateType' label='Target Update Type' property='targetUpdateType' />,
          <DataTableColumn key='categoryId' label='Category Id' property='categoryId' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]


        this.props.queries.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.Name,
            customerKey: item.CustomerKey,
            createdDate: item.CreatedDate,
            targetType: item.TargetType,
            targetUpdateType: item.TargetUpdateType,
            categoryId: item.CategoryId,
            status: item.Status
          })
        });

        break;
      
      case 'Automations':   

        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='isActive' label='Is Active?' property='isActive' />,
          <DataTableColumn key='status' label='Status' property='status' />
        ]

        this.props.automations.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.Name,
            customerKey: item.CustomerKey,
            createdDate: item.CreatedDate,
            isActive: item.IsActive,
            status: item.Status
          })
        });

        break;

      case 'Journeys':   

        columns = [
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='key' label='Key' property='key' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,
          <DataTableColumn key='version' label='Version' property='version' />,
          <DataTableColumn key='entryMode' label='Entry Mode' property='entryMode' />,
          <DataTableColumn key='definitionType' label='Definition Type' property='definitionType' />,
          <DataTableColumn key='categoryId' label='Category Id' property='categoryId' />,

          <DataTableColumn key='currentPopulation' label='Current Population' property='currentPopulation' />,
          <DataTableColumn key='cumulativePopulation' label='Cumulative Population' property='cumulativePopulation' />,
          <DataTableColumn key='metGoal' label='Met Goal' property='metGoal' />,
          <DataTableColumn key='metExitCriteria' label='Met Exit Criteria' property='metExitCriteria' />,
          <DataTableColumn key='goalPerformance' label='Goal Performance' property='goalPerformance' />,
          <DataTableColumn key='status' label='Status' property='status' />,
        ]

        this.props.journeys.items.forEach(item => {
          selectedObjectDetailsList.push({
            name: item.name,
            key: item.key,
            createdDate: item.createdDate,
            version: item.version,
            entryMode: item.entryMode,
            definitionType: item.definitionType,
            categoryId: item.categoryId,
            currentPopulation: item.stats.currentPopulation,
            cumulativePopulation: item.stats.cumulativePopulation,
            metGoal: item.stats.metGoal,
            metExitCriteria: item.stats.metExitCriteria,
            goalPerformance: item.stats.goalPerformance,
            status: item.status
          })
        });

        break;
      
      case 'Business Units':   
        
        columns = [
          <DataTableColumn key='clientId' label='Client Id' property='clientId' />,
          <DataTableColumn key='enterpriseId' label='Enterprise Id' property='enterpriseId' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='email' label='Email' property='email' />,
          <DataTableColumn key='fromName' label='From Name' property='fromName' />,
          <DataTableColumn key='businessName' label='Business Name' property='businessName' />,
          <DataTableColumn key='phone' label='Phone' property='phone' />,
          <DataTableColumn key='address' label='Address' property='address' />,
          <DataTableColumn key='city' label='City' property='city' />,
          <DataTableColumn key='state' label='State' property='state' />,
          <DataTableColumn key='zip' label='Zip' property='zip' />,
          <DataTableColumn key='country' label='Country' property='country' />,
          <DataTableColumn key='isActive' label='Is Active?' property='isActive' />,
          <DataTableColumn key='dbid' label='Database Id' property='dbid' />,
          <DataTableColumn key='masterUnsubscribeBehavior' label='Master Unsubscribe Behavior' property='masterUnsubscribeBehavior' />
        ]
      
        this.props.businessUnits.forEach(item => {
          selectedObjectDetailsList.push({
            clientId: item.Client.ID,
            enterpriseId: item.Client.EnterpriseID,
            customerKey: item.CustomerKey,
            name: item.Name,
            email: item.Email,
            fromName: item.FromName,
            businessName: item.BusinessName,
            phone: item.Phone,
            address: item.Address,
            city: item.City,
            state: item.State,
            zip: item.Zip,
            country: item.Country,
            isActive: item.IsActive,
            dbid: item.DBID,
            masterUnsubscribeBehavior: item.MasterUnsubscribeBehavior
          })
        });

        break;

      case 'Users':   
 
        columns = [
          <DataTableColumn key='id' label='Id' property='id' />,
          <DataTableColumn key='customerKey' label='Customer Key' property='customerKey' />,
          <DataTableColumn key='userId' label='User Id' property='userId' />,
          <DataTableColumn key='name' label='Name' property='name' />,
          <DataTableColumn key='email' label='Email' property='email' />,
          <DataTableColumn key='createdDate' label='Created Date' property='createdDate' />,  
          <DataTableColumn key='mustChangePassword' label='Must Change Password' property='mustChangePassword' />,
          <DataTableColumn key='activeFlag' label='Active Flag' property='activeFlag' />,
          <DataTableColumn key='isApiUser' label='Is Api User?' property='isApiUser' />,  
          <DataTableColumn key='notificationEmailAddress' label='Notification Email Address' property='notificationEmailAddress' />,  
          <DataTableColumn key='defaultBusinessUnit' label='Default Business Unit' property='defaultBusinessUnit' />,  
          <DataTableColumn key='salesforceId' label='Salesforce Id' property='salesforceId' />,  
          <DataTableColumn key='isSendable' label='Is Sendable?' property='isSendable' />,  
        ]
                

        this.props.accountUsers.forEach(item => {
          selectedObjectDetailsList.push({ 
            id: item.ID,
            customerKey: item.CustomerKey,
            userId: item.UserID,
            name: item.Name,
            email: item.Email,
            createdDate: item.CreatedDate,
            mustChangePassword: item.MustChangePassword,
            activeFlag: item.ActiveFlag,
            isApiUser: item.IsAPIUser,
            notificationEmailAddress: item.NotificationEmailAddress,
            defaultBusinessUnit: item.DefaultBusinessUnit,
            salesforceId: item.SalesForceID,
            isSendable: item.IsSendable
          })
        })

        break;
     
      default:
        selectedObjectDetailsList = <p>default</p>   
    }
    this.setState({ items: selectedObjectDetailsList, columns})
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
                        {toTitleCase(this.props.accountInventorySelected)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInventoryDetails)