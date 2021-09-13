// setup inspired by github.com/node-workers-example/worker.js
const throng = require('throng');
const Queue = require('bull');
const {
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
  getSubscribersSummary,
  getAuditEvents,
  getJourneyAuditLog,
  getJourneyDetails
} = require('./sfmcHelper.js');



let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';


let workers = process.env.WEB_CONCURRENCY || 2;
const Redis = require('ioredis');
const client = new Redis(REDIS_URL);
const subscriber = new Redis(REDIS_URL);

let maxJobsPerWorker = 50;

// taken from https://github.com/OptimalBits/bull/blob/develop/PATTERNS.md
const opts = {
  // redisOpts here will contain at least a property of connectionName which will identify the queue based on its name
  createClient: function (type, redisOpts) {

    switch (type) {
      case 'client':
        return client;
      case 'subscriber':
        return subscriber;
      case 'bclient':
        return new Redis(REDIS_URL, redisOpts);
      default:
        throw new Error('Unexpected connection type: ', type);
    }
  }
}

function start() {
  let eventDataQueue = new Queue('eventData', opts);
  let accountInventoryQueue = new Queue('accountInventory', opts)
  let subscriberInventoryQueue = new Queue('subscriberInventory', opts)
  let auditEventsQueue = new Queue('auditEvents', opts)

  // let emailInventoryQueue = new Queue('emailInventory', opts);
  // let templateInventoryQueue = new Queue('templateInventory', opts);
  // let categoryInventoryQueue = new Queue('categoryInventory', opts);
  // let triggeredSendInventoryQueue = new Queue(
  //   'triggeredSendInventory',
  //   opts
  // );
  // let cloudPageInventoryQueue = new Queue('cloudPageInventory', opts);
  // let dataExtensionInventoryQueue = new Queue(
  //   'dataExtensionInventory',
  //   opts
  // );
  // let filterInventoryQueue = new Queue('filterInventory', opts);
  // let queryInventoryQueue = new Queue('queryInventory', opts);
  // let automationInventoryQueue = new Queue('automationInventory', opts);
  // let journeyInventoryQueue = new Queue('journeyInventory', opts);
  // let businessUnitInfoQueue = new Queue('businessUnitInfo', opts);
  // let accountUserQueue = new Queue('accountUserInventory', opts);

  eventDataQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_ALL_EVENT_DATA') {
      let eventDataResult = await getAllEventData();
      return eventDataResult;
    }
  });

  subscriberInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_SUBSCRIBERS') {
      let subscribersResult = await getSubscribersSummary();
      return subscribersResult
    }
  })

  auditEventsQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_AUDIT_EVENTS') {
      let auditEventsResults = await getAuditEvents();
      return auditEventsResults
    }

    if (job.data.jobType == 'GET_JOURNEY_AUDIT_LOG') {
      let journeyAuditLogResults = await getJourneyAuditLog(job.data.journeyId);
      return journeyAuditLogResults
    }
  })

  accountInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_EMAIL_INVENTORY') {
      let emailInventoryResult = await getEmailInventory();
      return emailInventoryResult;
    }

    if (job.data.jobType == 'GET_TEMPLATE_INVENTORY') {
      let templateInventoryResult = await getTemplateInventory();
      return templateInventoryResult;
    }


    if (job.data.jobType == 'GET_CATEGORIES') {
      let categoriesResult = await getCategories();
      return categoriesResult;
    }

    if (job.data.jobType == 'GET_TRIGGERED_SENDS') {
      let triggeredSendsResult = await getTriggeredSends();
      return triggeredSendsResult;
    }

    if (job.data.jobType == 'GET_CLOUD_PAGES') {
      let cloudPagesResult = await getCloudPages();
      return cloudPagesResult;
    }

    if (job.data.jobType == 'GET_ALL_DATA_EXTENSIONS') {
      let dataExtensionsResult = await getAllDataExtensions();
      return dataExtensionsResult;
    }

    if (job.data.jobType == 'GET_FILTER_DATA') {
      let filterDataResult = await getFilterData();
      return filterDataResult;
    }

    if (job.data.jobType == 'GET_QUERIES') {
      let queriesResult = await getQueries();
      return queriesResult;
    }

    if (job.data.jobType == 'GET_AUTOMATIONS') {
      let automationsResult = await getAutomations();
      return automationsResult;
    }

    if (job.data.jobType == 'GET_JOURNEYS') {
      let journeysResult = await getJourneys();
      return journeysResult;
    }

    if (job.data.jobType == 'GET_BUSINESS_UNIT') {
      let businessUnitResult = await getBusinessUnits();
      return businessUnitResult;
    }

    if (job.data.jobType == 'GET_ACCOUNT_USERS') {
      let accountUsersResult = await getAccountUsers();
      return accountUsersResult;
    }

    if (job.data.jobType == 'GET_JOURNEY_DETAILS') {
      let journeyDetailsResult = await getJourneyDetails(job.data.journeyKey);
      return journeyDetailsResult;
    }
  })
}


// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
