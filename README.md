# Welcome to the SFMC Audit Dashboard 👋

The SFMC Audit dashboard gives Admins a 360 view 🌎 of their Account in an instant ⚡.

## Upcoming Features

- ✔ Business Unit Inventory
- ✔ Subscriber Summary
- ✔ Account details
- ✔ Email Activity Summary
- ✔ Downloadable Excel files
- ✔ Searchable Subscriber
- ✔ Filter data by Business Unit
- ⌛ Automation Runs Analysis (+charts)
- ⌛ Email Trend Analysis (+charts)
- ⌛ Additional Journey Analysis

## Installing the App

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/balwillSFDC/sfmc-audit-dashboard)

## Local Development

This project has 2 `package.json` files so you will need to run `npm start` in two locations for local development. You will also need to run the `worker.js` file. You will need a total of 3 terminal windows to run locally

```
#First Terminal - worker file
git clone https://github.com/balwillSFDC/sfmc-audit-dashboard
npm install
node worker.js

#Second Terminal - server
npm start

#Third Terminal - UI
cd react-ui
npm start
```
