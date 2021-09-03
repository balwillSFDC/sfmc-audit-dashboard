import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, IconSettings } from '@salesforce/design-system-react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { 
  addSubscribersJob, 
  updateSubscribersJob,
  addEventDataJob,
  updateEventDataJob,
  addEmailInventoryJob, 
  updateEmailInventoryJob,
  addTemplateInventoryJob,
  updateTemplateInventoryJob,
  addCategoriesJob,
  updateCategoriesJob,
  addTriggeredSendsJob,
  updateTriggeredSendsJob,
  addCloudPagesJob,
  updateCloudPagesJob,
  addDataExtensionsJob,
  updateDataExtensionsJob,
  addFilterDataJob,
  updateFilterDataJob,
  addQueriesJob,
  updateQueriesJob,
  addAutomationsJob,
  updateAutomationsJob,
  addJourneysJob,
  updateJourneysJob,
  addBusinessUnitsJob,
  updateBusinessUnitsJob,
  addAccountUsersJob,
  updateAccountUsersJob,
  addRolesJob,
  updateRolesJob,
  addAuditEventsJob,
  updateAuditEventsJob
 } from '../../stateManagement/actions'

const mapStateToProps = (state) => {
  return {
    eventDataJob: state.eventDataJob,
    eventData: state.eventData,
    eventDataJobState: state.eventDataJobState,
    subscribersJob: state.subscribersJob,
    subscribers: state.subscribers,
    subscribersJobState: state.subscribersJobState,
    emailInventory: state.emailInventory,
    emailInventoryJob: state.emailInventoryJob,
    emailInventoryJobState: state.emailInventoryJobState,
    templateInventory: state.templateInventory,
    templateInventoryJob: state.templateInventoryJob,
    templateInventoryJobState: state.templateInventoryJobState,
    categories: state.categories,
    categoriesJob: state.categoriesJob,
    categoriesJobState: state.categoriesJobState,
    triggeredSends: state.triggeredSends,
    triggeredSendsJob: state.triggeredSendsJob,
    triggeredSendsJobState: state.triggeredSendsJobState,
    cloudPages: state.cloudPages,
    cloudPagesJob: state.cloudPagesJob,
    cloudPagesJobState: state.cloudPagesJobState,
    dataExtensions: state.dataExtensions,
    dataExtensionsJob: state.dataExtensionsJob,
    dataExtensionsJobState: state.dataExtensionsJobState,
    filterData: state.filterData,
    filterDataJob: state.filterDataJob,
    filterDataJobState: state.filterDataJobState,
    queries: state.queries,
    queriesJob: state.queriesJob,
    queriesJobState: state.queriesJobState,
    automations: state.automations,
    automationsJob: state.automationsJob,
    automationsJobState: state.automationsJobState,
    journeys: state.journeys,
    journeysJob: state.journeysJob,
    journeysJobState: state.journeysJobState,
    businessUnits: state.businessUnits,
    businessUnitsJob: state.businessUnitsJob,
    businessUnitsJobState: state.businessUnitsJobState,
    accountUsers: state.accountUsers,
    accountUsersJob: state.accountUsersJob,
    accountUsersJobState: state.accountUsersJobState,
    auditEvents: state.auditEvents,
    auditEventsJob: state.auditEventsJob,
    auditEventsJobState: state.auditEventsJobState
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class DownloadButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileType:
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      fileExtension: ".xlsx",
      buttonState: 'Ready', // Can either be 'Ready' or 'Loading'
      downloadActionState: 'Download Pending' // Can either be 'Download Pending' or 'Download Complete'
    }
  }
  
  exportToExcel = () => {
    this.setState({downloadActionState: 'Download Pending'})

    // if data isn't in the state already - get it
    if (
      this.props.eventDataJobState !== 'completed' || 
      this.props.subscribersJobState !== 'completed' || 
      this.props.emailInventoryJobState !== 'completed' ||
      this.props.templateInventoryJobState !== 'completed' ||
      this.props.categoriesJobState !== 'completed' ||
      this.props.triggeredSendsJobState !== 'completed' || 
      this.props.cloudPagesJobState !== 'completed' ||
      this.props.dataExtensionsJobState !== 'completed' ||
      this.props.filterDataJobState !== 'completed' ||
      this.props.queriesJobState !== 'completed' ||
      this.props.automationsJobState !== 'completed' ||
      this.props.journeysJobState !== 'completed' ||
      this.props.businessUnitsJobState !== 'completed' ||
      this.props.accountUsersJobState !== 'completed' ||
      this.props.auditEventsJobState !== 'completed'
    ) {
      this.setState({buttonState: 'Loading'})

      this.props.dispatch(addEventDataJob());
      this.props.dispatch(addSubscribersJob())
      this.props.dispatch(addEmailInventoryJob())
      this.props.dispatch(addTemplateInventoryJob())
      this.props.dispatch(addCategoriesJob())
      this.props.dispatch(addTriggeredSendsJob())
      this.props.dispatch(addCloudPagesJob())
      this.props.dispatch(addDataExtensionsJob())
      this.props.dispatch(addFilterDataJob())
      this.props.dispatch(addQueriesJob())
      this.props.dispatch(addAutomationsJob())
      this.props.dispatch(addJourneysJob())
      this.props.dispatch(addBusinessUnitsJob())
      this.props.dispatch(addAccountUsersJob())
      this.props.dispatch(addAuditEventsJob())

      // 1st counter - we do this to prevent an infinite loop with setInterval()
      let counter1 = 0; 

      setInterval(() => {
        if (counter1 < 10) {
          counter1++

          if (this.props.eventDataJobState !== 'completed') {
            this.props.dispatch(updateEventDataJob(this.props.eventDataJob))
          }

          if (this.props.subscribersJobState !== 'completed') {
            this.props.dispatch(updateSubscribersJob(this.props.subscribersJob))
          }

          if (this.props.emailInventoryJobState !== 'completed') {
            this.props.dispatch(updateEmailInventoryJob(this.props.emailInventoryJob));
          } 
  
          if (this.props.templateInventoryJobState !== 'completed') {
            this.props.dispatch(updateTemplateInventoryJob(this.props.templateInventoryJob));
          }
          
          if (this.props.categoriesJobState !== 'completed') {
            this.props.dispatch(updateCategoriesJob(this.props.categoriesJob));
          }
  
          if (this.props.triggeredSendsJobState !== 'completed') {
            this.props.dispatch(updateTriggeredSendsJob(this.props.triggeredSendsJob));
          }
  
          if (this.props.cloudPagesJobState !== 'completed') {
            this.props.dispatch(updateCloudPagesJob(this.props.cloudPagesJob));
          }
  
          if (this.props.dataExtensionsJobState !== 'completed') {
            this.props.dispatch(updateDataExtensionsJob(this.props.dataExtensionsJob));
          }
  
          if (this.props.filterDataJobState !== 'completed') {
            this.props.dispatch(updateFilterDataJob(this.props.filterDataJob));
          }
  
          if (this.props.queriesJobState !== 'completed') {
            this.props.dispatch(updateQueriesJob(this.props.queriesJob));
          }
  
          if (this.props.automationsJobState !== 'completed') {
            this.props.dispatch(updateAutomationsJob(this.props.automationsJob));
          }
  
          if (this.props.journeysJobState !== 'completed' ) {
            this.props.dispatch(updateJourneysJob(this.props.journeysJob));
          }
  
          if (this.props.businessUnitsJobState !== 'completed') {
            this.props.dispatch(updateBusinessUnitsJob(this.props.businessUnitsJob))
          }
  
          if (this.props.accountUsersJobState !== 'completed') {
            this.props.dispatch(updateAccountUsersJob(this.props.accountUsersJob))
          }

          if (this.props.auditEventsJobState !== 'completed') {
            this.props.dispatch(updateAuditEventsJob(this.props.auditEventsJob))
          }
        }    

        if (
          this.props.eventDataJobState === 'completed' && 
          this.props.subscribersJobState === 'completed' && 
          this.props.emailInventoryJobState === 'completed' &&
          this.props.templateInventoryJobState === 'completed' &&
          this.props.categoriesJobState === 'completed' &&
          this.props.triggeredSendsJobState === 'completed' && 
          this.props.cloudPagesJobState === 'completed' &&
          this.props.dataExtensionsJobState === 'completed' &&
          this.props.filterDataJobState === 'completed' &&
          this.props.queriesJobState === 'completed' &&
          this.props.automationsJobState === 'completed' &&
          this.props.journeysJobState === 'completed' &&
          this.props.businessUnitsJobState === 'completed' &&
          this.props.accountUsersJobState === 'completed' &&
          this.props.auditEventsJobState === 'completed'
        ) {
          this.setState({buttonState: 'Ready'})
        }

      }, 2000 )
    }


    let counter2 = 0

    setInterval(() => {
      if (counter2 < 10) {
        counter2++ 
        if (
          this.state.buttonState === 'Ready' &&
          this.state.downloadActionState === 'Download Pending' &&
          this.props.eventDataJobState === 'completed' && 
          this.props.subscribersJobState === 'completed' && 
          this.props.emailInventoryJobState === 'completed' &&
          this.props.templateInventoryJobState === 'completed' &&
          this.props.categoriesJobState === 'completed' &&
          this.props.triggeredSendsJobState === 'completed' && 
          this.props.cloudPagesJobState === 'completed' &&
          this.props.dataExtensionsJobState === 'completed' &&
          this.props.filterDataJobState === 'completed' &&
          this.props.queriesJobState === 'completed' &&
          this.props.automationsJobState === 'completed' &&
          this.props.journeysJobState === 'completed' &&
          this.props.businessUnitsJobState === 'completed' &&
          this.props.accountUsersJobState === 'completed' &&
          this.props.auditEventsJobState === 'completed'
        ) {
          console.log('Should be downloading a file soon...')
          let allSubscribers = this.props.subscribers.allSubscribers
    
          // Clean up sendData prop to pull object props that matter
          let sendData = []     
          this.props.eventData.sendData.forEach(item => {
            sendData.push({
              sendId: item.SendID,
              listId: item.PartnerProperties.Value,
              subscriberKey: item.SubscriberKey,
              eventDate: item.EventDate,
              eventType: item.EventType,
              triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID,
              batchId: item.BatchID 
            })
          })
      
          // Clean up openData prop to pull object props that matter
          let openData = []
          this.props.eventData.openData.forEach(item => {
            openData.push({
              Id: item.ID,
              sendId: item.SendID,
              subscriberKey: item.SubscriberKey,
              eventDate: item.EventDate,
              eventType: item.EventType,
              triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID,
              batchId: item.BatchID 
            })
          });    
          
          // Clean up bounceData prop to pull object props that matter
          let bounceData = []
          this.props.eventData.bounceData.forEach(item => {
            bounceData.push({
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
      
          // Clean up clickData prop to pull object props that matter
          let clickData = []
          this.props.eventData.clickData.forEach(item => {
            clickData.push({
              Id: item.ID,
              sendId: item.SendID,
              subscriberKey: item.SubscriberKey,
              eventDate: item.EventDate,
              eventType: item.EventType,
              triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID
            })
          });
      
          // Clean up bounceData prop to pull object props that matter
          let unsubscribeData = []
          this.props.eventData.unsubscribeData.forEach(item => {
            unsubscribeData.push({
              Id: item.ID,
              sendId: item.SendID,
              subscriberKey: item.SubscriberKey,
              eventDate: item.EventDate,
              eventType: item.EventType,
              triggeredSendDefinitionObjectId: item.TriggeredSendDefinitionObjectID
            })
          });
      
          let htmlEmailData = []
          this.props.emailInventory.htmlEmailData.items.forEach(item => {
            htmlEmailData.push({
              customerKey: item.customerKey,
              name: item.name,
              owner: item.owner.name,
              status: item.status.name 
            })
          });
      
          let templateEmailData = []
          this.props.emailInventory.templateEmailData.items.forEach(item => {
            templateEmailData.push({
              customerKey: item.customerKey,
              name: item.name,
              owner: item.owner.name,
              status: item.status.name 
            })
          });
      
          let textOnlyEmailData = []
          this.props.emailInventory.textOnlyEmailData.items.forEach(item => {
            textOnlyEmailData.push({
              customerKey: item.customerKey,
              name: item.name,
              owner: item.owner.name,
              status: item.status.name 
            })
          });
      
          let templateInventory = []
          this.props.templateInventory.items.forEach(item => {
            templateInventory.push({
              customerKey: item.customerKey,
              name: item.name,
              status: item.status.name 
            })
          });
      
          // categories doesn't need any object props filtered out...
          let categories = this.props.categories.items
      
          let triggeredSends = []
          this.props.triggeredSends.forEach(item => {
            triggeredSends.push({
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
      
          let cloudPages = []
          this.props.cloudPages.items.forEach(item => {
            cloudPages.push({
              id: item.id,
              name: item.name,
              customerKey: item.customerKey,
              contentType: item.contentType,
              owner: item.owner.name,
              createdDate: item.createdDate,
              status: item.status.name
            })
          });
      
          let dataExtensions = []
          this.props.dataExtensions.forEach(item => {
            dataExtensions.push({
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
      
          let filters = []
          this.props.filterData.forEach(item => {
            filters.push({
              name: item.Name,
              customerKey: item.CustomerKey,
              createdDate: item.CreatedDate,
              dataSourceName: item.DataSource.Name,
              dataSourceCustomerKey: item.DataSource.CustomerKey
            })
          });
      
          let queries = []
          this.props.queries.forEach(item => {
            queries.push({
              name: item.Name,
              customerKey: item.CustomerKey,
              createdDate: item.CreatedDate,
              targetType: item.TargetType,
              targetUpdateType: item.TargetUpdateType,
              categoryId: item.CategoryId,
              status: item.Status
            })
          });
      
          let automations = []
          this.props.automations.forEach(item => {
            automations.push({
              name: item.Name,
              customerKey: item.CustomerKey,
              createdDate: item.CreatedDate,
              isActive: item.IsActive,
              status: item.Status
            })
          });
      
          let journeys = []
          this.props.journeys.items.forEach(item => {
            journeys.push({
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
      
          let businessUnits = []
          this.props.businessUnits.forEach(item => {
            businessUnits.push({
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
      
          let users = []
          this.props.accountUsers.forEach(item => {
            users.push({ 
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
              isSendable: item.IsSendable,
              lastLogin: item.LastSuccessfulLogin
            })
          })
      
          let auditEvents = []
          this.props.auditEvents.items.forEach(item => {
            users.push({ 
              id: item.ID,
              createdDate: item.createdDate,
              memberId: item.memberId,
              employee: item.employeeName,
              objectType: item.objectType.name,
              operation: item.operation.name
            })
          })
      
      
          const ws_allSubscribers = XLSX.utils.json_to_sheet(allSubscribers);
          const ws_sendData = XLSX.utils.json_to_sheet(sendData);
          const ws_openData = XLSX.utils.json_to_sheet(openData);
          const ws_bounceData = XLSX.utils.json_to_sheet(bounceData);
          const ws_clickData = XLSX.utils.json_to_sheet(clickData);
          const ws_unsubscribeData = XLSX.utils.json_to_sheet(unsubscribeData);
          const ws_htmlEmailData = XLSX.utils.json_to_sheet(htmlEmailData);
          const ws_templateEmailData = XLSX.utils.json_to_sheet(templateEmailData);
          const ws_textOnlyEmailData = XLSX.utils.json_to_sheet(textOnlyEmailData);
          const ws_templates = XLSX.utils.json_to_sheet(templateInventory);
          const ws_categories = XLSX.utils.json_to_sheet(categories);
          const ws_triggeredSends = XLSX.utils.json_to_sheet(triggeredSends);
          const ws_cloudPages = XLSX.utils.json_to_sheet(cloudPages);
          const ws_dataExtensions = XLSX.utils.json_to_sheet(dataExtensions);
          const ws_filters = XLSX.utils.json_to_sheet(filters);
          const ws_queries = XLSX.utils.json_to_sheet(queries);
          const ws_automations = XLSX.utils.json_to_sheet(automations);
          const ws_journeys = XLSX.utils.json_to_sheet(journeys);
          const ws_businessUnits = XLSX.utils.json_to_sheet(businessUnits);
          const ws_users = XLSX.utils.json_to_sheet(users);
          const ws_auditEvents = XLSX.utils.json_to_sheet(auditEvents)
      
      
          let Sheets = {
            allSubscribers: ws_allSubscribers,
            sendData: ws_sendData,
            openData: ws_openData,
            bounceData: ws_bounceData,
            clickData: ws_clickData,
            unsubscribeData: ws_unsubscribeData,
            htmlEmailData: ws_htmlEmailData,
            templateEmailData: ws_templateEmailData,
            textOnlyEmailData: ws_textOnlyEmailData,
            templates: ws_templates,
            categories: ws_categories,
            triggeredSends: ws_triggeredSends,
            cloudPages: ws_cloudPages,
            dataExtensions: ws_dataExtensions,
            filters: ws_filters,
            queries: ws_queries,
            automations: ws_automations,
            journeys: ws_journeys,
            businessUnits: ws_businessUnits,
            users: ws_users,
            auditEvents: ws_auditEvents
          }
      
          let SheetNames = [
            'allSubscribers',
            'sendData',
            'openData',
            'bounceData',
            'clickData',
            'unsubscribeData',
            'htmlEmailData',
            'templateEmailData',
            'textOnlyEmailData',
            'templates',
            'categories',
            'triggeredSends',
            'cloudPages',
            'dataExtensions',
            'filters',
            'queries',
            'journeys',
            'businessUnits',
            'users',
            'auditEvents'
          ]
      
          const wb = { 
            Sheets, 
            SheetNames
          };
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const data = new Blob([excelBuffer], { type: this.state.fileType });
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0')
          const mm = String(today.getMonth() + 1).padStart(2, '0')
          const yyyy = today.getFullYear();
          FileSaver.saveAs(data, 'TA_Dashboard_Data_' + mm + dd + yyyy + this.state.fileExtension);
          this.setState({downloadActionState: 'Download Complete'})
        }
      }
    }, 2000)
  };

  render() {
    return (
      <div className='downloadButton'>
      <IconSettings iconPath="/icons/">
        <Button 
          onClick={() => this.exportToExcel()} 
          iconPosition='left' 
          label={this.state.buttonState !== 'Ready' ? 'Download Pending...' : 'Download Data' }
          iconCategory='utility'
          iconName='download'  
          variant='brand' 
          disabled={this.state.buttonState !== 'Ready' ? true : false}
        /> 
      </IconSettings>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton)