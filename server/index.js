const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';

const clientId = process.env.REACT_APP_SFMC_CLIENTID;
const clientSecret = process.env.REACT_APP_SFMC_CLIENTSECRET;

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false // try removing this later...
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// =======================================================
// ROUTES
// =======================================================
// list routes below

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
