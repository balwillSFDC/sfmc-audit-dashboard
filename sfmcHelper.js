// ==============================================================
// SETUP
// ==============================================================

// Require Marketing Cloud Packages + Parameters
const env = require('dotenv').config();
const axios = require('axios');
const ET_Client = require('sfmc-fuelsdk-node');
const clientId = process.env.REACT_APP_SFMC_CLIENTID;
const clientSecret = process.env.REACT_APP_SFMC_CLIENTSECRET;
const stack = process.env.REACT_APP_SFMC_STACK;
const origin = process.env.REACT_APP_SFMC_ORIGIN;
const authOrigin = process.env.REACT_APP_SFMC_AUTHORIGIN;
const soapOrigin = process.env.REACT_APP_SFMC_SOAPORIGIN;

// Instantiating Node Class
const sfmcNode = new ET_Client(clientId, clientSecret, stack, {
  origin,
  authOrigin,
  soapOrigin,
  authOptions: {
    authVersion: 2,
    // accountId: parentBU,
    applicationType: 'Server'
  }
});

function getEventData(eventType) {
  switch (eventType) {
    case 'sent':
      let sentOptions = {
        props: [
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'EventType',
          'BatchID',
          'TriggeredSendDefinitionObjectID',
          'ListID'
        ]
      };

      let sentEvent = sfmcNode.sentEvent(sentOptions);
      let sentEventResults = new Promise((resolve, reject) => {
        sentEvent.get((err, res) => {
          if (err) console.log(err);
          if (res) resolve(res.body.Results);
        });
      });

      return sentEventResults;
    case 'open':
      let openOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'EventType',
          'TriggeredSendDefinitionObjectID',
          'BatchID'
        ]
      };

      let openEvent = sfmcNode.openEvent(openOptions);
      let openEventResults = new Promise((resolve, reject) => {
        openEvent.get((err, res) => {
          if (err) console.log(err);
          if (res) resolve(res.body.Results);
        });
      });

      return openEventResults;
    case 'bounce':
      let bounceOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'SMTPCode',
          'SMTPReason',
          'BounceCategory',
          'EventType',
          'TriggeredSendDefinitionObjectID',
          'BatchID'
        ]
      };

      let bounceEvent = sfmcNode.bounceEvent(bounceOptions);
      let bounceEventResults = new Promise((resolve, reject) => {
        bounceEvent.get((err, res) => {
          if (err) console.log(err);
          if (res) resolve(res.body.Results);
        });
      });

      return bounceEventResults;
    
    case 'click':
      let clickOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'SendID',
          'SubscriberKey',
          'EventType',
          'TriggeredSendDefinitionObjectID',
          'BatchID',
          'URLID',
          'URL'
        ]
      };

      let clickEvent = sfmcNode.clickEvent(clickOptions);
      let clickEventResults = new Promise((resolve, reject) => {
        clickEvent.get((err, res) => {
          if (err) console.log(err);
          if (res) resolve(res.body.Results);
        });
      });

      return clickEventResults;
    case 'unsubscribe':
      let unsubscribeOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'TriggeredSendDefinitionObjectID',
          'BatchID',
          'IsMasterUnsubscribed'
        ]
      };

      let unsubscribeEvent = sfmcNode.unsubEvent(unsubscribeOptions);
      let unsubscribeEventResults = new Promise((resolve, reject) => {
        unsubscribeEvent.get((err, res) => {
          if (err) console.log(err);
          if (res) resolve(res.body.Results);
        });
      });

      return unsubscribeEventResults;
  }
}

async function getAccessToken() {
  let data = JSON.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  });

  let config = {
    method: 'post',
    url: `${authOrigin}v2/token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  let accessTokenResponse = await axios(config);
  let accessToken = accessTokenResponse.data.access_token;

  return accessToken;
}


async function getHtmlEmails() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    // Get Html Email Inventory
    let htmlEmailRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=htmlemail&$fields=id,customerkey,assettype,name,owner,data,status`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    let htmlEmailResponse = await axios(htmlEmailRequestConfig);
    let htmlEmailData = htmlEmailResponse.data;
    count += htmlEmailData.count
    htmlEmailData.items.forEach((item) => items.push(item))

    moreItems = (htmlEmailData.count === 0 || htmlEmailData.count - pageSize < 0) ? false : true

  }

  return {
    count,
    page,
    pageSize,
    items
  }
}

async function getTemplateEmails() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    // Get Html Email Inventory
    let templateEmailRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=templatebasedemail&$fields=id, customerkey,assettype,name,owner,data,status`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
  
    let templateEmailResponse = await axios(templateEmailRequestConfig);
    let templateEmailData = templateEmailResponse.data;
    count += templateEmailData.count
    templateEmailData.items.forEach((item) => items.push(item))

    moreItems = (templateEmailData.count === 0 || templateEmailData.count - pageSize < 0) ? false : true

  }

  return {
    count,
    page,
    pageSize,
    items
  }
}

async function getTextOnlyEmails() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    // Get Html Email Inventory
    let textOnlyEmailRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=textonlyemail&$fields=id, customerkey,assettype,name,owner,data,status`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
  
    let textOnlyEmailResponse = await axios(textOnlyEmailRequestConfig);
    let textOnlyEmailData = textOnlyEmailResponse.data;
    count += textOnlyEmailData.count
    textOnlyEmailData.items.forEach((item) => items.push(item))

    moreItems = (textOnlyEmailData.count === 0 || textOnlyEmailData.count - pageSize < 0) ? false : true

  }

  return {
    count,
    page,
    pageSize,
    items
  }
}

async function getEmailInventory() {

  // Get Html Email Inventory
  let htmlEmailData = await getHtmlEmails()

  // Get Template Based Email Inventory
  let templateEmailData = await getTemplateEmails()

  // Get Text Only Email Inventory
  let textOnlyEmailData = await getTextOnlyEmails()

  // console.log({
  //   htmlEmailData,
  //   templateEmailData,
  //   textOnlyEmailData
  // })

  return {
    htmlEmailData,
    templateEmailData,
    textOnlyEmailData
  };
}

async function getTemplateInventory() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    let templateRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=template&$fields=id,assetType,name,status`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
  
    let templateResponse = await axios(templateRequestConfig);
    let templateData = templateResponse.data;
    count += templateData.count
    templateData.items.forEach((item) => items.push(item))

    moreItems = (templateData.count === 0 || templateData.count - pageSize < 0) ? false : true

  }

  return {
    count,
    page,
    pageSize,
    items
  }
}

async function getCategories() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    let categoryRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/categories?$page=1&$pagesize=500`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    let categoryResponse = await axios(categoryRequestConfig);
    let categoryData = categoryResponse.data;
    count += categoryData.count
    categoryData.items.forEach((item) => items.push(item))

    moreItems = (categoryData.count === 0 || categoryData.count - pageSize < 0) ? false : true

  }

  // console.log({
  //   count,
  //   page,
  //   pageSize,
  //   items
  // })


  return {
    count,
    page,
    pageSize,
    items
  }
}


async function getTriggeredSends() {
  let triggeredSendOptions = {
    props: [
      'TriggeredSendDefinition.CreatedDate',
      'TriggeredSendDefinition.CustomerKey',
      'TriggeredSendDefinition.Name',
      'TriggeredSendDefinition.Description',
      'TriggeredSendDefinition.TriggeredSendType',
      'TriggeredSendDefinition.TriggeredSendStatus',
      'TriggeredSendDefinition.FromName',
      'TriggeredSendDefinition.FromAddress',
      'TriggeredSendDefinition.EmailSubject'
    ]
  };

  let triggeredSend = sfmcNode.triggeredSend(triggeredSendOptions);
  let triggeredSendResults = new Promise((resolve, reject) => {
    triggeredSend.get((err, res) => {
      if (err) console.log(err);
      if (res) resolve(res.body.Results);
    });
  });

  return triggeredSendResults;
}


async function getCloudPages() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    let cloudPageRequestConfig = {
      method: 'get',
      url: `${origin}asset/v1/content/assets/?$page=1&$pagesize=10000&$filter=assetType.name=webpage`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    let cloudPageRequestResponse = await axios(cloudPageRequestConfig);
    let cloudPageData = cloudPageRequestResponse.data;
    count += cloudPageData.count
    cloudPageData.items.forEach((item) => items.push(item))

    moreItems = (cloudPageData.count === 0 || cloudPageData.count - pageSize < 0) ? false : true

  }

  // console.log({
  //   count,
  //   page,
  //   pageSize,
  //   items
  // })


  return {
    count,
    page,
    pageSize,
    items
  }
}

function getAllDataExtensions() {
  var options = {
    props: [
      'ObjectID',
      'CustomerKey',
      'Name',
      'CreatedDate',
      'ModifiedDate',
      'Client.ID',
      'Description',
      'IsSendable',
      'IsTestable',
      'Status',
      'IsPlatformObject',
      'DataRetentionPeriodLength',
      'DataRetentionPeriodUnitOfMeasure',
      'RowBasedRetention',
      'ResetRetentionPeriodOnImport',
      'DeleteAtEndOfRetentionPeriod',
      'RetainUntil',
      'DataRetentionPeriod'
    ],
    filter: {
      leftOperand: 'Client.ID',
      operator: 'isNotNull',
      rightOperand: ''
    }
  };

  const de = sfmcNode.dataExtension(options);

  let dataExtensionsResult = new Promise((resolve, reject) => {
    de.get((err, res) => {
      if (err) console.log(err);
      if (res) resolve(res.body.Results);
    });
  });

  return dataExtensionsResult;
}

function getFilterData() {
  let props = [
    'ObjectID',
    'Client.ID',
    'CategoryID',
    'Client.ClientPartnerKey',
    'Name',
    'CustomerKey',
    'Description',
    'CreatedDate',
    'ModifiedDate',
    'DataFilter',
    'DataSourceType',
    'DataSourceClassName',
    'DataSource.ID',
    'DataSource.ObjectID',
    'DataSource.Name',
    'DataSource.ListName',
    'DataSource.CustomerKey',
    'DataSource.CreatedDate',
    'DataSource.ModifiedDate'
  ];

  const filterDefinition = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('filterdefinition', props, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return filterDefinition;
}

function getQueries() {
  let props = [
    'ObjectID',
    'Client.ID',
    'Name',
    'CustomerKey',
    'Description',
    'TargetType',
    'TargetUpdateType',
    'FileType',
    'FileSpec',
    'Status',
    'CreatedDate',
    'ModifiedDate',
    'CategoryID'
  ];

  const queryDefinition = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('querydefinition', props, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return queryDefinition;
}

function getAutomations() {
  let props = [
    'ObjectID',
    'Name',
    'Description',
    'Schedule.ID',
    'CustomerKey',
    'Client.ID',
    'IsActive',
    'CreatedDate',
    'Client.CreatedBy',
    'ModifiedDate',
    'Client.ModifiedBy',
    'Status',
    'Client.EnterpriseID'
  ];
  let filter = {
    filter: {
      leftOperand: 'Status',
      operator: 'IN',
      rightOperand: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  };

  const automation = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('Automation', props, filter, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return automation;
}

async function getJourneys() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    let journeyRequestConfig = {
      method: 'get',
      url: `${origin}/interaction/v1/interactions?$page=1&$pagesize=10000&`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    let journeyRequestResponse = await axios(journeyRequestConfig);
    let journeyData = journeyRequestResponse.data;
    count += journeyData.count
    journeyData.items.forEach((item) => items.push(item))

    moreItems = (journeyData.count === 0 || journeyData.count - pageSize < 0) ? false : true

  }

  // console.log({
  //   count,
  //   page,
  //   pageSize,
  //   items
  // })


  return {
    count,
    page,
    pageSize,
    items
  }
}


function getBusinessUnits() {
  let props = [
    'ID',
    'AccountType',
    'ParentID',
    'BrandID',
    'PrivateLabelID',
    'ReportingParentID',
    'Name',
    'Email',
    'FromName',
    'BusinessName',
    'Phone',
    'Address',
    'Fax',
    'City',
    'State',
    'Zip',
    'Country',
    'IsActive',
    'IsTestAccount',
    'Client.ID',
    'DBID',
    'CustomerID',
    'DeletedDate',
    'EditionID',
    'IsTrialAccount',
    'Locale.LocaleCode',
    'Client.EnterpriseID',
    'ModifiedDate',
    'CreatedDate',
    'Subscription.SubscriptionID',
    'Subscription.HasPurchasedEmails',
    'Subscription.EmailsPurchased',
    'Subscription.Period',
    'Subscription.AccountsPurchased',
    'Subscription.LPAccountsPurchased',
    'Subscription.DOTOAccountsPurchased',
    'Subscription.BUAccountsPurchased',
    'Subscription.AdvAccountsPurchased',
    'Subscription.BeginDate',
    'Subscription.EndDate',
    'Subscription.Notes',
    'Subscription.ContractNumber',
    'Subscription.ContractModifier',
    'PartnerKey',
    'Client.PartnerClientKey',
    'ParentName',
    'ParentAccount.ID',
    'ParentAccount.Name',
    'ParentAccount.ParentID',
    'ParentAccount.CustomerKey',
    'ParentAccount.AccountType',
    'CustomerKey',
    'Description',
    'DefaultSendClassification.ObjectID',
    'DefaultHomePage.ID',
    'MasterUnsubscribeBehavior',
    'InheritAddress',
    'Roles',
    'SubscriberFilter',
    'ContextualRoles',
    'LanguageLocale.LocaleCode'
  ];

  const businessUnit = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('businessunit', props, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return businessUnit;
}

function getAccountUsers() {
  let props = [
    'AccountUser.ID',
    'AccountUser.CreatedDate',
    'AccountUser.ModifiedDate',
    'AccountUser.Client.ID',
    'AccountUser.AccountUserID',
    'AccountUser.UserID',
    'AccountUser.Name',
    'AccountUser.Email',
    'AccountUser.MustChangePassword',
    'AccountUser.ActiveFlag',
    'AccountUser.ChallengePhrase',
    'AccountUser.ChallengeAnswer',
    'AccountUser.IsAPIUser',
    'AccountUser.NotificationEmailAddress',
    'AccountUser.Client.PartnerClientKey',
    'AccountUser.Password',
    'AccountUser.IsSendable',
    'AccountUser.CustomerKey',
    'AccountUser.SalesForceID',
    'AccountUser.DefaultBusinessUnit',
    'AccountUser.Client.ModifiedBy',
    'LastSuccessfulLogin'
  ];

  let filter = {
    filter: {
      leftOperand: 'AccountUser.NotificationEmailAddress',
      operator: 'notEquals',
      rightOperand: ' '
    }
  };

  const accountUsers = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('accountuser', props, filter, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return accountUsers;
}

function getRoles() {
  let props = [
    'ObjectID',
    'CustomerKey',
    'Name',
    'Description',
    'IsPrivate',
    'IsSystemDefined',
    'Client.EnterpriseID',
    'Client.ID',
    'Client.CreatedBy',
    'CreatedDate',
    'Client.ModifiedBy',
    'ModifiedDate'
  ];

  const roles = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('role', props, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return roles;
}

async function getAuditEvents() {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    let auditEventRequestConfig = {
      method: 'get',
      url: `${origin}data/v1/audit/auditEvents?$pagesize=10000`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    let auditEventRequestResponse = await axios(auditEventRequestConfig);
    let auditEventData = auditEventRequestResponse.data;
    count += auditEventData.count
    auditEventData.items.forEach((item) => items.push(item))

    moreItems = (auditEventData.count === 0 || auditEventData.count - pageSize < 0) ? false : true

  }

  // console.log({
  //   count,
  //   page,
  //   pageSize,
  //   items
  // })


  return {
    count,
    page,
    pageSize,
    items
  }
}


async function getAllEventData() {
  let sendData = await getEventData('sent');
  let openData = await getEventData('open');
  let bounceData = await getEventData('bounce');
  let clickData = await getEventData('click');
  let unsubscribeData = await getEventData('unsubscribe');

  return {
    sendData,
    openData,
    bounceData,
    clickData,
    unsubscribeData
  };
}

function getSubscribers() {
  let subscriberOptions = {
    props: [ 
      'ID',
      'SubscriberKey',
      'EmailAddress',
      'CreatedDate',
      'Status',
      'UnsubscribedDate'
    ]
  };

  let subscriber = sfmcNode.subscriber(subscriberOptions);

  let subscriberResults = new Promise((resolve, reject) => {
    subscriber.get((err, res) => {
      if (err) console.log(err);
      if (res) resolve(res.body.Results);
    });
  });
  
  return subscriberResults;
  
}

// Identifies all duplicate subscribers based on if they share the same email address. Updates State with the results
function identifyDuplicateSubscribers(subscribers) {
  const lookup = subscribers.reduce((a, e) => {
    a[e.EmailAddress] = ++a[e.EmailAddress] || 0
    return a
  }, {});
  
  let duplicateSubscribers = subscribers.filter(a => lookup[a.EmailAddress]);
  return duplicateSubscribers
};

// Identifies all Active Subscribers based on if their Status = 'Active'. Updates State with the results
function identifyActiveSubscribers(subscribers) {
  let activeSubscribers = subscribers.filter(a => a.Status === 'Active')

  return activeSubscribers
}

// Identifies all Unsubscribed Subscribers based on if their Status = 'Unsubscribed'. Updates State with the results
function identifyUnsubscribedSubscribers(subscribers) {
  let unsubscribedSubscribers = subscribers.filter(a => a.Status === 'Unsubscribed')

  return unsubscribedSubscribers
}

// Identifies all Bounced Subscribers based on if their Status = 'Bounced'. Updates State with the results
function identifyBouncedSubscribers(subscribers) {
  let bouncedSubscribers = subscribers.filter(a => a.Status === 'Bounced')

  return bouncedSubscribers
}

async function getSubscribersSummary() {
  let allSubscribers = await getSubscribers()

  let duplicateSubscribers = identifyDuplicateSubscribers(allSubscribers)
  let activeSubscribers = identifyActiveSubscribers(allSubscribers)
  let unsubscribedSubscribers = identifyUnsubscribedSubscribers(allSubscribers)
  let bouncedSubscribers = identifyBouncedSubscribers(allSubscribers)

  return {
    allSubscribers,
    duplicateSubscribers,
    activeSubscribers,
    unsubscribedSubscribers,
    bouncedSubscribers
  }
}

function getJourneysSubscriberIsIn(subscriberKey) {

}

// Journey Audit logs shows information about how a Journey has been modified
async function getJourneyAuditLog(journeyId) {
  let accessToken = await getAccessToken();
  let page = 0
  let pageSize = 10000
  let moreItems = true
  let count = 0
  let items = []

  while (moreItems) {
    page++
    
    // Get Html Email Inventory
    let journeyAuditLogRequestConfig = {
      method: 'get',
      url: `${origin}interaction/v1/interactions/${journeyId}/audit/all?$page=${page}&$pagesize=${pageSize}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    let journeyAuditLogResponse = await axios(journeyAuditLogRequestConfig);
    let journeyAuditLogData = journeyAuditLogResponse.data;
    count += journeyAuditLogData.count
    journeyAuditLogData.items.forEach((item) => items.push(item))

    moreItems = (journeyAuditLogData.count === 0 || journeyAuditLogData.count - pageSize < 0) ? false : true

  }

  // console.log({
  //   count,
  //   page: page - 1,
  //   pageSize,
  //   items
  // })

  return {
    count,
    page,
    pageSize,
    items
  }
}

// getJourneyAuditLog('dd3204f7-58c2-4aa5-8a98-f48551613e69')



module.exports = {
  getAllEventData,
  getEmailInventory,
  getTemplateInventory,
  getCategories,
  getTriggeredSends,
  getCloudPages,
  getAllDataExtensions,
  getFilterData,
  getQueries,
  getAutomations,
  getJourneys,
  getBusinessUnits,
  getAccountUsers,
  getRoles,
  getSubscribersSummary,
  getAuditEvents,
  getJourneyAuditLog
};
