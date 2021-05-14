# Welcome to the SFMC Audit Dashboard 👋
The SFMC Audit dashboard ⏲️ gives SFMC Super Admins a 360 view 🌎 of their Account in an instant ⚡. 

## Upcoming Features
* ⌛ Business Unit Inventory metrics
* ⌛ User metrics
* ⌛ Account details
* ⌛ Downloadable Excel & JSON files 

## What are the benefits of using this template? 
* Easy deployment to heroku (only need to deploy one project)
* Includes a server backend to prevent API requests being blocked by CORS
* Folder structure is scalable + clearly defined
* The following dependencies are installed and set up:
  * React-ui
    * axios
    * prop-types
    * react-dom
    * react-redux
    * react-router-dom
    * redux
    * redux-devtools-extension
    * redux-thunk
  * Server  
    * axios 
    * dotenv
    * express
    * helmet
    * salesforce-marketing-cloud-sdk (remove if not building SFMC app) 

## Local Development
The template has 2 ```package.json``` files so you will need to run ```npm start``` in two locations for local development. 
```
git clone https://github.com/balwillSFDC/react-redux-template
npm install
npm start 
cd react-ui
npm start
```
