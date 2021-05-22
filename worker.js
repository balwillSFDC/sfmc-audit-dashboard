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
  let workQueue = new Queue('work', REDIS_URL);

  workQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.data);

    switch (job.data.jobType) {
      case 'GET_ALL_EVENT_DATA':
        let eventDataResult = await getAllEventData();
        return eventDataResult;
      case 'GET_EMAIL_INVENTORY':
        let emailInventoryResult = await getEmailInventory();
        return emailInventoryResult;
      case 'GET_TEMPLATE_INVENTORY':
        let templateInventoryResult = await getTemplateInventory();
        return templateInventoryResult;
      case 'GET_CATEGORIES':
        let categoriesResult = await getCategories();
        return categoriesResult;
      case 'GET_TRIGGERED_SENDS':
        let triggeredSendsResult = await getTriggeredSends();
        return triggeredSendsResult;
      case 'GET_CLOUD_PAGES':
        let cloudPagesResult = await getCloudPages();
        return cloudPagesResult;
      case 'GET_ALL_DATA_EXTENSIONS':
        let dataExtensionsResult = await getAllDataExtensions();
        return dataExtensionsResult;
      case 'GET_FILTER_DATA':
        let filterDataResult = await getFilterData();
        return filterDataResult;
      case 'GET_QUERIES':
        let queriesResult = await getQueries();
        return queriesResult;
      case 'GET_AUTOMATIONS':
        let automationsResult = await getAutomations();
        return automationsResult;
      case 'GET_JOURNEYS':
        let journeysResult = await getJourneys();
        return journeysResult;
      case 'GET_BUSINESS_UNIT':
        let businessUnitResult = await getBusinessUnits();
        return businessUnitResult;
      case 'GET_ACCOUNT_USERS':
        let accountUsersResult = await getAccountUsers();
        return accountUsersResult;
      case 'GET_ROLES':
        let rolesResult = await getRoles();
        return rolesResult;
    }
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
