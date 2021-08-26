const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';
const WORKERS = process.env.WEB_CONCURRENCY || 2;
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let Queue = require('bull');

const clientId = process.env.REACT_APP_SFMC_CLIENTID;
const clientSecret = process.env.REACT_APP_SFMC_CLIENTSECRET;

const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')

const serverAdapter = new ExpressAdapter();


const app = express();

serverAdapter.setBasePath('/admin/queues')
app.use('/admin/queues', serverAdapter.getRouter());

app.use(
  helmet({
    contentSecurityPolicy: false, // try removing this later...
    frameguard: false
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Build Queues for API request processing
let eventDataQueue = new Queue('eventData', REDIS_URL);
let subscriberInventoryQueue = new Queue('subscriberInventory', REDIS_URL)
let auditEventsQueue = new Queue('auditEvents', REDIS_URL)
let accountInventoryQueue = new Queue('accountInventory', REDIS_URL)

// **** merge into an 'accountInventoryQueue' *****

// let emailInventoryQueue = new Queue('emailInventory', REDIS_URL);
// let templateInventoryQueue = new Queue('templateInventory', REDIS_URL);
// let categoryInventoryQueue = new Queue('categoryInventory', REDIS_URL);
// let triggeredSendInventoryQueue = new Queue(
//   'triggeredSendInventory',
//   REDIS_URL
// );
// let cloudPageInventoryQueue = new Queue('cloudPageInventory', REDIS_URL);
// let dataExtensionInventoryQueue = new Queue(
//   'dataExtensionInventory',
//   REDIS_URL
// );
// let filterInventoryQueue = new Queue('filterInventory', REDIS_URL);
// let queryInventoryQueue = new Queue('queryInventory', REDIS_URL);
// let automationInventoryQueue = new Queue('automationInventory', REDIS_URL);
// let journeyInventoryQueue = new Queue('journeyInventory', REDIS_URL);
// let businessUnitInfoQueue = new Queue('businessUnitInfo', REDIS_URL);
// let accountUserQueue = new Queue('accountUserInventory', REDIS_URL);
// let roleInventoryQueue = new Queue('roleInventory', REDIS_URL);




const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(eventDataQueue),

    // merge into 'AccountInventoryQueue'
    // new BullAdapter(emailInventoryQueue),
    // new BullAdapter(templateInventoryQueue),
    // new BullAdapter(categoryInventoryQueue),
    // new BullAdapter(triggeredSendInventoryQueue),
    // new BullAdapter(cloudPageInventoryQueue),
    // new BullAdapter(dataExtensionInventoryQueue),
    // new BullAdapter(filterInventoryQueue),
    // new BullAdapter(queryInventoryQueue),
    // new BullAdapter(automationInventoryQueue),
    // new BullAdapter(journeyInventoryQueue),
    // new BullAdapter(businessUnitInfoQueue),
    // new BullAdapter(accountUserQueue),
    // new BullAdapter(subscriberInventoryQueue),
    new BullAdapter(auditEventsQueue)
  ],
  serverAdapter:serverAdapter

})



// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// =======================================================
// ROUTES
// =======================================================
// list routes below

// Post a request for all event data (opens, clicks, bounces, etc.)
app.post('/api/getAllEventData', async (req, res) => {
  console.log('request sent for getAllEventData()');

  try {
    let job = await eventDataQueue.add({
      jobType: 'GET_ALL_EVENT_DATA'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Gets the results for allEventData request
app.get('/api/getAllEventData/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await eventDataQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Email Inventory
app.post('/api/getEmailInventory', async (req, res) => {
  console.log('request sent for getEmailInventory()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_EMAIL_INVENTORY'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for an Email Inventory request
app.get('/api/getEmailInventory/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Template Inventory
app.post('/api/getTemplateInventory', async (req, res) => {
  console.log('request sent for getTemplateInventory()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_TEMPLATE_INVENTORY'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for an Template Inventory request
app.get('/api/getTemplateInventory/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Categories
app.post('/api/getCategories', async (req, res) => {
  console.log('request sent for getCategories()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_CATEGORIES'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for a Categories request
app.get('/api/getCategories/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Triggered Sends
app.post('/api/getTriggeredSends', async (req, res) => {
  console.log('request sent for getTriggeredSends()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_TRIGGERED_SENDS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for a Triggered Sends request
app.get('/api/getTriggeredSends/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Cloud Pages
app.post('/api/getCloudPage', async (req, res) => {
  console.log('request sent for getCloudPages()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_CLOUD_PAGES'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for a Cloud Page request
app.get('/api/getCloudPage/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for all data extensions
app.post('/api/getAllDataExtensions', async (req, res) => {
  console.log('request sent for getAllDataExtensions()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_ALL_DATA_EXTENSIONS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for all data extensions
app.get('/api/getAllDataExtensions/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for filter data
app.post('/api/getFilterData', async (req, res) => {
  console.log('request sent for getFilterData()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_FILTER_DATA'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for filter data
app.get('/api/getFilterData/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for queries
app.post('/api/getQueries', async (req, res) => {
  console.log('request sent for getQueries()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_QUERIES'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for queries
app.get('/api/getQueries/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for automations
app.post('/api/getAutomations', async (req, res) => {
  console.log('request sent for getAutomations()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_AUTOMATIONS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for automations
app.get('/api/getAutomations/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for journeys
app.post('/api/getJourneys', async (req, res) => {
  console.log('request sent for getJourneys()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_JOURNEYS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for journeys
app.get('/api/getJourneys/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Business Unit info
app.post('/api/getBusinessUnits', async (req, res) => {
  console.log('request sent for getBusinessUnits()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_BUSINESS_UNIT'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for Business Unit info
app.get('/api/getBusinessUnits/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for Account Users
app.post('/api/getAccountUsers', async (req, res) => {
  console.log('request sent for getAccountUsers()');

  try {
    let job = await accountInventoryQueue.add({
      jobType: 'GET_ACCOUNT_USERS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for Account Users
app.get('/api/getAccountUsers/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await accountInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Post a request for roles
app.post('/api/getRoles', async (req, res) => {
  console.log('request sent for getRoles()');

  try {
    let job = await roleInventoryQueue.add({
      jobType: 'GET_ROLES'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

// Get results for roles
app.get('/api/getRoles/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await roleInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
});

// Add getSubscribers() job
app.post('/api/getSubscribers', async (req, res) => {
  console.log('request sent for getSubscribers()');

  try {
    let job = await subscriberInventoryQueue.add({
      jobType: 'GET_SUBSCRIBERS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
})

// Retrieve getSubscribers() job results
app.get('/api/getSubscribers/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await subscriberInventoryQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
})


// Add getAuditEvents() job
app.post('/api/getAuditEvents', async (req, res) => {
  console.log('request sent for getAuditEvents()');

  try {
    let job = await auditEventsQueue.add({
      jobType: 'GET_AUDIT_EVENTS'
    });

    res.json({
      id: job.id,
      state: await job.getState()
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
})


// Retrieve getAuditEvents() job results
app.get('/api/getAuditEvents/:id', async (req, res) => {
  let id = req.params.id;

  if (id) {
    let job = await auditEventsQueue.getJob(id);

    if (job === null) {
      res.status(404).end();
    } else {
      let state = await job.getState();
      let result = job.returnvalue;
      let reason = job.failedReason;
      res.json({ id, state, result, reason });
    }
  } else {
    res.status(400).send('You have either not included an id in your request');
  }
})

// All remaining requests return the React app, so it can handle routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(
    `Node ${
      isDev ? 'dev server' : 'cluster worker ' + process.pid
    }: listening on port ${PORT}`
  );
});
