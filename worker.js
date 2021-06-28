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
  getRoles
} = require('./sfmcHelper.js');

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  let eventDataQueue = new Queue('eventData', REDIS_URL);
  let emailInventoryQueue = new Queue('emailInventory', REDIS_URL);
  let templateInventoryQueue = new Queue('templateInventory', REDIS_URL);
  let categoryInventoryQueue = new Queue('categoryInventory', REDIS_URL);
  let triggeredSendInventoryQueue = new Queue(
    'triggeredSendInventory',
    REDIS_URL
  );
  let cloudPageInventoryQueue = new Queue('cloudPageInventory', REDIS_URL);
  let dataExtensionInventoryQueue = new Queue(
    'dataExtensionInventory',
    REDIS_URL
  );
  let filterInventoryQueue = new Queue('filterInventory', REDIS_URL);
  let queryInventoryQueue = new Queue('queryInventory', REDIS_URL);
  let automationInventoryQueue = new Queue('automationInventory', REDIS_URL);
  let journeyInventoryQueue = new Queue('journeyInventory', REDIS_URL);
  let businessUnitInfoQueue = new Queue('businessUnitInfo', REDIS_URL);
  let accountUserQueue = new Queue('accountUserInventory', REDIS_URL);
  let roleInventoryQueue = new Queue('roleInventory', REDIS_URL);

  eventDataQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_ALL_EVENT_DATA') {
      let eventDataResult = await getAllEventData();
      return eventDataResult;
    }
  });

  emailInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_EMAIL_INVENTORY') {
      let emailInventoryResult = await getEmailInventory();
      return emailInventoryResult;
    }
  });

  templateInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_TEMPLATE_INVENTORY') {
      let templateInventoryResult = await getTemplateInventory();
      return templateInventoryResult;
    }
  });

  categoryInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_CATEGORIES') {
      let categoriesResult = await getCategories();
      return categoriesResult;
    }
  });

  triggeredSendInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_TRIGGERED_SENDS') {
      let triggeredSendsResult = await getTriggeredSends();
      return triggeredSendsResult;
    }
  });

  cloudPageInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_CLOUD_PAGES') {
      let cloudPagesResult = await getCloudPages();
      return cloudPagesResult;
    }
  });

  dataExtensionInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_ALL_DATA_EXTENSIONS') {
      let dataExtensionsResult = await getAllDataExtensions();
      return dataExtensionsResult;
    }
  });

  filterInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_FILTER_DATA') {
      let filterDataResult = await getFilterData();
      return filterDataResult;
    }
  });

  queryInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_QUERIES') {
      let queriesResult = await getQueries();
      return queriesResult;
    }
  });

  automationInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_AUTOMATIONS') {
      let automationsResult = await getAutomations();
      return automationsResult;
    }
  });

  journeyInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_JOURNEYS') {
      let journeysResult = await getJourneys();
      return journeysResult;
    }
  });

  businessUnitInfoQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_BUSINESS_UNIT') {
      let businessUnitResult = await getBusinessUnits();
      return businessUnitResult;
    }
  });

  accountUserQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_ACCOUNT_USERS') {
      let accountUsersResult = await getAccountUsers();
      return accountUsersResult;
    }
  });

  roleInventoryQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    if (job.data.jobType == 'GET_ROLES') {
      let rolesResult = await getRoles();
      return rolesResult;
    }
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
