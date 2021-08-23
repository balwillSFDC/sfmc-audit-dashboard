import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, IconSettings } from '@salesforce/design-system-react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const mapStateToProps = (state) => {
  return {
    subscribers: state.subscribers,
    eventData: state.eventData,
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
    // ...
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
      fileExtension: ".xlsx"
    }
  }
  
  exportToExcel = () => {
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
        isSendable: item.IsSendable
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
      users: ws_users
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
      'users'
    ]

    const wb = { 
      Sheets, 
      SheetNames
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: this.state.fileType });
    FileSaver.saveAs(data, 'TestFile' + this.state.fileExtension);
  };


  render() {
    return (
      <div className='downloadButton'>
      <IconSettings iconPath="/icons/">
        <Button 
          onClick={() => this.exportToExcel()} 
          iconPosition='left' 
          label='Download Data'
          iconCategory='utility'
          iconName='download'  
          variant='brand'
        /> 
      </IconSettings>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton)