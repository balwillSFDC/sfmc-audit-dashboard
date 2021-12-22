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



// Creates account specifc ET Clients - this allows us to data from each business unit instead of only 1 
async function instantiateETClients() {
  let buMIDs = await getMIDs();

  let etClients = {}
  buMIDs.forEach((mid, i) => { 
    etClients[mid] = new ET_Client(clientId, clientSecret, stack, {
      origin,
      authOrigin,
      soapOrigin,
      authOptions: {
        authVersion: 2,
        accountId: mid,
        applicationType: 'Server'
      }
    })})

  return etClients
}

async function getDataExtensions() {
  let etClients = await instantiateETClients()
  let mids = Object.keys(etClients)
  
  
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

  let promises = [];

  for (mid of mids) {
    let de = etClients[mid].dataExtension(options);

    let dataExtensionsResult = new Promise((resolve, reject) => {
      de.get((err, res) => {
        if (err) console.log(err);
        if (res) resolve(res.body.Results);
      });
    });
    promises.push(dataExtensionsResult)
  }

  return Promise.all(promises).then(results => {
    return [].concat(...results)
  })

}

async function getMIDs() {
  const businessUnits = await getBusinessUnits();

  let buMIDs = [];
  businessUnits.forEach((result) => { buMIDs.push(result.Client.ID); });
  return buMIDs;
}

async function getBusinessUnits() {
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

  const retrieveOptions = {
    filter: {
      leftOperand: 'Name',
      operator: 'isNotNull',
      rightOperand: ''
    },
    queryAllAccounts: true
  }

  const businessUnit = new Promise( async (resolve, reject) => {
    
    sfmcNode.SoapClient.retrieve('businessunit', props, retrieveOptions, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return businessUnit;
}


async function getEventData(eventType) {
  let etClients = await instantiateETClients()
  let mids = await getMIDs()
  let promises = [];

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
          'ListID',
          'Client.ID'
        ]
      };



      for (mid of mids) {
        let sentEvent = etClients[mid].sentEvent(sentOptions);
        let sentEventResults = new Promise((resolve, reject) => {
          sentEvent.get((err, res) => {
            if (err) console.log(err);
            if (res) resolve(res.body.Results);
          });
        });

        promises.push(sentEventResults)
      }

      return Promise.all(promises).then(results => {
        return [].concat(...results)
      })
    case 'open':
      let openOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'EventType',
          'TriggeredSendDefinitionObjectID',
          'BatchID',
          'Client.ID'
        ]
      };

      for (mid of mids) {
        let openEvent = etClients[mid].openEvent(openOptions);
        let openEventResults = new Promise((resolve, reject) => {
          openEvent.get((err, res) => {
            if (err) console.log(err);
            if (res) resolve(res.body.Results);
          });
        });

        promises.push(openEventResults)
      }


      return Promise.all(promises).then(results => {
        return [].concat(...results)
      })

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
          'BatchID',
          'Client.ID'
        ]
      };

      for (mid of mids) {
        let bounceEvent = etClients[mid].bounceEvent(bounceOptions);
        let bounceEventResults = new Promise((resolve, reject) => {
          bounceEvent.get((err, res) => {
            if (err) console.log(err);
            if (res) resolve(res.body.Results);
          });
        });

        promises.push(bounceEventResults)
      }


      return Promise.all(promises).then(results => {
        return [].concat(...results)
      })

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
          'URL',
          'Client.ID'
        ]
      };

      for (mid of mids) {
        let clickEvent = etClients[mid].clickEvent(clickOptions);
        let clickEventResults = new Promise((resolve, reject) => {
          clickEvent.get((err, res) => {
            if (err) console.log(err);
            if (res) resolve(res.body.Results);
          });
        });

        promises.push(clickEventResults)
      }


      return Promise.all(promises).then(results => {
        return [].concat(...results)
      })
      
    case 'unsubscribe':
      let unsubscribeOptions = {
        props: [
          'ID',
          'SendID', 
          'EventDate', 
          'SubscriberKey',
          'TriggeredSendDefinitionObjectID',
          'BatchID',
          'IsMasterUnsubscribed',
          'Client.ID'
        ],
        // filter: {
        //   leftOperand: 'SubscriberKey',
        //   operator: 'isNotNull',
        //   rightOperand: ''
        // }
      };

      for (mid of mids) {
        let unsubscribeEvent = etClients[mid].unsubEvent(unsubscribeOptions);
        let unsubscribeEventResults = new Promise((resolve, reject) => {
          unsubscribeEvent.get((err, res) => {
            if (err) console.log(err);
            if (res) resolve(res.body.Results);
          });
        });

        promises.push(unsubscribeEventResults)
      }


      return Promise.all(promises).then(results => {
        return [].concat(...results)
      })
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

async function getAccessToken(mid) {
  let tokenReqConfig;
  
  if (mid == undefined || mid == null) {
    tokenReqConfig = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    }
  } else {
    tokenReqConfig = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      account_id: mid
    }
  }
  
  let data = JSON.stringify(tokenReqConfig);

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
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
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
        url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=htmlemail&$fields=id,customerkey,assettype,name,owner,data,status,memberId`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      };
  
      let htmlEmailResponse = await axios(htmlEmailRequestConfig);
      let htmlEmailData = htmlEmailResponse.data;
      count += htmlEmailData.count
      count_AllMids += htmlEmailData.count
      htmlEmailData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (htmlEmailData.count === 0 || htmlEmailData.count - pageSize < 0) ? false : true
    }
  }

  return {
    count: count_AllMids,
    items: items_AllMids,
  }
}

async function getTemplateEmails() {
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
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
        url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=templatebasedemail&$fields=id, customerkey,assettype,name,owner,data,status,memberId`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
    
      let templateEmailResponse = await axios(templateEmailRequestConfig);
      let templateEmailData = templateEmailResponse.data;
      count += templateEmailData.count
      count_AllMids += templateEmailData.count
      templateEmailData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (templateEmailData.count === 0 || templateEmailData.count - pageSize < 0) ? false : true

    }
  }

  return {
    count: count_AllMids,
    items: items_AllMids
  }
}

async function getTextOnlyEmails() {
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
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
        url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=textonlyemail&$fields=id, customerkey,assettype,name,owner,data,status,memberId`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
    
      let textOnlyEmailResponse = await axios(textOnlyEmailRequestConfig);
      let textOnlyEmailData = textOnlyEmailResponse.data;
      count += textOnlyEmailData.count
      count_AllMids += textOnlyEmailData.count
      textOnlyEmailData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })

      moreItems = (textOnlyEmailData.count === 0 || textOnlyEmailData.count - pageSize < 0) ? false : true

    }
  }
  
  return {
    count: count_AllMids,
    items: items_AllMids
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
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
    let page = 0
    let pageSize = 10000
    let moreItems = true
    let count = 0
    let items = []
  
    while (moreItems) {
      page++
      
      let templateRequestConfig = {
        method: 'get',
        url: `${origin}asset/v1/content/assets/?$page=${page}&$pagesize=${pageSize}&$filter=assetType.name=template&$fields=id,assetType,name,status,memberId`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
    
      let templateResponse = await axios(templateRequestConfig);
      let templateData = templateResponse.data;
      count += templateData.count
      count_AllMids += templateData.count
      templateData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (templateData.count === 0 || templateData.count - pageSize < 0) ? false : true
  
    }  
  }

  return {
    count: count_AllMids,
    items: items_AllMids
  }
}

async function getCategories() {
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
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
      count_AllMids += categoryData.count
      categoryData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })

      moreItems = (categoryData.count === 0 || categoryData.count - pageSize < 0) ? false : true

    }
  }

  return {
    count: count_AllMids,
    items: items_AllMids
  }
}


async function getTriggeredSends() {
  let etClients = await instantiateETClients()
  let mids = await getMIDs()
  let promises = [];

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
      'TriggeredSendDefinition.EmailSubject',
      'Client.ID'
    ]
  };


  for (mid of mids) {
    let triggeredSend = etClients[mid].triggeredSend(triggeredSendOptions);
    let triggeredSendResults = new Promise((resolve, reject) => {
      triggeredSend.get((err, res) => {
        if (err) console.log(err);
        if (res) resolve(res.body.Results);
      });
    });

    promises.push(triggeredSendResults)
  }
  
  return Promise.all(promises).then(results => {
    return [].concat(...results)
  })
}

async function getCloudPages() {
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
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
      count_AllMids += cloudPageData.count
      cloudPageData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (cloudPageData.count === 0 || cloudPageData.count - pageSize < 0) ? false : true
  
    }
  }

  return {
    count: count_AllMids,
    items: items_AllMids
  }
}

// function getAllDataExtensions() {
//   var options = {
//     props: [
//       'ObjectID',
//       'CustomerKey',
//       'Name',
//       'CreatedDate',
//       'ModifiedDate',
//       'Client.ID',
//       'Description',
//       'IsSendable',
//       'IsTestable',
//       'Status',
//       'IsPlatformObject',
//       'DataRetentionPeriodLength',
//       'DataRetentionPeriodUnitOfMeasure',
//       'RowBasedRetention',
//       'ResetRetentionPeriodOnImport',
//       'DeleteAtEndOfRetentionPeriod',
//       'RetainUntil',
//       'DataRetentionPeriod'
//     ],
//     filter: {
//       leftOperand: 'Client.ID',
//       operator: 'isNotNull',
//       rightOperand: ''
//     },
//     queryAllAccounts: true
//   };

//   const de = sfmcNode.dataExtension(options);

//   let dataExtensionsResult = new Promise((resolve, reject) => {
//     de.get((err, res) => {
//       if (err) console.log(err);
//       if (res) resolve(res.body.Results);
//     });
//   });

//   return dataExtensionsResult;
// }


async function getFilterData() {
  let etClients = await instantiateETClients()
  let mids = await getMIDs()
  let promises = [];

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

  for (mid of mids) {
    const filterDefinition = new Promise((resolve, reject) => {
      etClients[mid].SoapClient.retrieve('filterdefinition', props, (err, res) => {
        if (err) reject(err);
        if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
      });
    });

    promises.push(filterDefinition)
  }
  
  return Promise.all(promises).then(results => {
    return [].concat(...results)
  })

}

async function getQueries() {
  let etClients = await instantiateETClients()
  let mids = await getMIDs()
  let promises = [];

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

  for (mid of mids) {
    const queryDefinition = new Promise((resolve, reject) => {
      etClients[mid].SoapClient.retrieve('querydefinition', props, (err, res) => {
        if (err) reject(err);
        if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
      });
    });

    promises.push(queryDefinition)
  }
  
  return Promise.all(promises).then(results => {
    return [].concat(...results)
  })

}

async function getAutomations() {
  let etClients = await instantiateETClients()
  let mids = await getMIDs()
  let promises = [];

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
    'Client.EnterpriseID',
  ];

  let filter = {
    filter: {
      leftOperand: 'Status',
      operator: 'IN',
      rightOperand: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    queryAllAccounts: true
  };


  for (mid of mids) {
    const mid_cache = mid 
    const automation = new Promise((resolve, reject) => {
      etClients[mid].SoapClient.retrieve('Automation', props, filter, (err, res) => {
        if (err) reject(err);
        if (res && res.body.OverallStatus === 'OK' && res.body.Results.length > 0) {
          let results = res.body.Results 
          results.forEach(result => result.memberId = mid_cache)
          resolve(results);
        }
      });
    });

    promises.push(automation)
  }
  
  return Promise.all(promises).then(results => {
    return [].concat(...results)
  })

}

async function getJourneys() {
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
    let page = 0
    let pageSize = 10000
    let moreItems = true
    let count = 0
    let items = []
    const mid_cache = mid

    while (moreItems) {
      page++
      
      let journeyRequestConfig = {
        method: 'get',
        url: `${origin}/interaction/v1/interactions?$page=${page}&$pagesize=10000&`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };

      let journeyRequestResponse = await axios(journeyRequestConfig);
      let journeyData = journeyRequestResponse.data;
      count += journeyData.count
      count_AllMids += journeyData.count
      journeyData.items.forEach((item) => {
        item.memberId = mid_cache
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (journeyData.count === 0 || journeyData.count - pageSize < 0) ? false : true
  
    }
  }

  // console.log({
  //   count,
  //   page,
  //   pageSize,
  //   items
  // })


  return {
    count: count_AllMids,
    items: items_AllMids,
  }
}

getJourneys().then(console.log)

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
    },
    queryAllAccounts: true
  };

  // getAccountUsers() doesn't need to loop through MIDs
  const accountUsers = new Promise((resolve, reject) => {
    sfmcNode.SoapClient.retrieve('accountuser', props, filter, (err, res) => {
      if (err) reject(err);
      if (res && res.body.OverallStatus === 'OK') resolve(res.body.Results);
    });
  });

  return accountUsers;
}

// still getRoles() function returns...
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
  let mids = await getMIDs()
  let count_AllMids = 0;
  let items_AllMids = []; 

  for (mid of mids) {
    let accessToken = await getAccessToken(mid);
    let page = 0
    let pageSize = 100
    let moreItems = true
    let count = 0
    let items = []
  
    while (moreItems) {
      page++
      
      let auditEventRequestConfig = {
        method: 'get',
        url: `${origin}data/v1/audit/auditEvents?$page=${page}&$pagesize=100`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
      let auditEventRequestResponse = await axios(auditEventRequestConfig);
      let auditEventData = auditEventRequestResponse.data;
      count += auditEventData.count
      count_AllMids += auditEventData.count
      auditEventData.items.forEach((item) => {
        items.push(item)
        items_AllMids.push(item)
      })
  
      moreItems = (auditEventData.count === 0 || auditEventData.count - pageSize < 0) ? false : true
  
    }
  }

  return {
    count: count_AllMids,
    items: items_AllMids
  }
}

function getSubscribers() {
  let subscriberOptions = {
    props: [ 
      'ID',
      'SubscriberKey',
      'EmailAddress',
      'CreatedDate',
      'Status',
      'UnsubscribedDate',
      'Client.ID'
    ]
  };

  // All subscribers data is stored in enterprise BU, no need to cycle through MIDs
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

async function getJourneyDetails(journeyDefinitionKey) {
  let accessToken = await getAccessToken();
  let journeyRequestConfig = {
    method: 'get',
    url: `${origin}interaction/v1/interactions/key:${journeyDefinitionKey}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };

  let journeyRequestResponse = await axios(journeyRequestConfig);
  let journeyRequestData = journeyRequestResponse.data;

  // console.log(journeyRequestData)

  return journeyRequestData
}


// getJourneyDetails("ff2a421c-17a6-300f-a1a5-b7e943d96b7b")

// Function to accomplish 'await' within a forEach statement. Taken here: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++ ) {
    await callback(array[i], i, array)
  }
}


async function getJourneysSubscriberIsIn(arrayOfContactKeys) {
  let accessToken = await getAccessToken();

  let contactMembershipRequestConfig = {
    method: 'post',
    url: `${origin}interaction/v1/interactions/contactMembership`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    data: { contactKeyList: arrayOfContactKeys } 
  };

  let contactMembershipResponse = await axios(contactMembershipRequestConfig);
  let contactMembershipData = contactMembershipResponse.data;
  let contactMemberships = contactMembershipData.results.contactMemberships

  let detailedContactMembershipsList = []

  // contactMemberships is an array of Journeys the contact is in. Definition Key is returned so we're using that to retrieve additional journey details
  if (contactMemberships.length > 0) {
    await asyncForEach(contactMemberships, async journey => {
      let journeyDetails = await getJourneyDetails(journey.definitionKey)
      journeyDetails.contactKey = journey.contactKey

      detailedContactMembershipsList.push(journeyDetails)
      
    })
  }

  return detailedContactMembershipsList

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


module.exports = {
  getAllEventData,
  getEmailInventory,
  getTemplateInventory,
  getCategories,
  getTriggeredSends,
  getCloudPages,
  // getAllDataExtensions,
  getFilterData,
  getQueries,
  getAutomations,
  getJourneys,
  getBusinessUnits,
  getAccountUsers,
  getRoles,
  getSubscribersSummary,
  getAuditEvents,
  getJourneyAuditLog,
  getJourneyDetails,
  getJourneysSubscriberIsIn,
  getDataExtensions
};
