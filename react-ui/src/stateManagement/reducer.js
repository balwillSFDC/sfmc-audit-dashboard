import initialState from './initialState';

const customMiddleWare = (store) => (next) => (action) => {
  // Custom Middleware
  // ...

  return next(action);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GET_ALL_EVENT_DATA_JOB':
      return {
        ...state
      };
    case 'ADD_GET_ALL_EVENT_DATA_JOB_SUCCESS':
      return {
        ...state,
        eventDataJob: action.payload.eventDataJob
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB':
      return {
        ...state
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB_SUCCESS':
      return {
        ...state,
        eventData: action.payload.eventData
      };
    case 'ADD_EMAIL_INVENTORY_JOB':
      return {
        ...state
      };
    case 'ADD_EMAIL_INVENTORY_JOB_SUCCESS':
      return {
        ...state,
        emailInventoryJob: action.payload.emailInventoryJob
      };
    case 'UPDATE_EMAIL_INVENTORY':
      return {
        ...state
      };
    case 'UPDATE_EMAIL_INVENTORY_SUCCESS':
      return {
        ...state,
        emailInventory: action.payload.emailInventory
      };
    case 'ADD_TEMPLATE_INVENTORY_JOB':
      return {
        ...state
      };
    case 'ADD_TEMPLATE_INVENTORY_JOB_SUCCESS':
      return {
        ...state,
        templateInventoryJob: action.payload.templateInventoryJob
      };
    case 'UPDATE_TEMPLATE_INVENTORY':
      return {
        ...state
      };
    case 'UPDATE_TEMPLATE_INVENTORY_SUCCESS':
      return {
        ...state,
        templateInventory: action.payload.templateInventory
      };
    case 'ADD_CATEGORIES_JOB':
      return {
        ...state
      };
    case 'ADD_CATEGORIES_JOB_SUCCESS':
      return {
        ...state,
        categoriesJob: action.payload.categoriesJob
      };
    case 'UPDATE_CATEGORIES':
      return {
        ...state
      };
    case 'UPDATE_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload.categories
      };
    case 'ADD_TRIGGERED_SENDS_JOB':
      return {
        ...state
      };
    case 'ADD_TRIGGERED_SENDS_JOB_SUCCESS':
      return {
        ...state,
        triggeredSendsJob: action.payload.triggeredSendsJob
      };
    case 'UPDATE_TRIGGERED_SENDS':
      return {
        ...state
      };
    case 'UPDATE_TRIGGERED_SENDS_SUCCESS':
      return {
        ...state,
        triggeredSends: action.payload.triggeredSends
      };
    case 'ADD_CLOUD_PAGES_JOB':
      return {
        ...state
      };
    case 'ADD_CLOUD_PAGES_JOB_SUCCESS':
      return {
        ...state,
        cloudPagesJob: action.payload.cloudPagesJob
      };
    case 'UPDATE_CLOUD_PAGES':
      return {
        ...state
      };
    case 'UPDATE_CLOUD_PAGES_SUCCESS':
      return {
        ...state,
        cloudPages: action.payload.cloudPages
      };
    case 'ADD_DATA_EXTENSIONS_JOB':
      return {
        ...state
      };
    case 'ADD_DATA_EXTENSIONS_JOB_SUCCESS':
      return {
        ...state,
        dataExtensionsJob: action.payload.dataExtensionsJob
      };
    case 'UPDATE_DATA_EXTENSIONS':
      return {
        ...state
      };
    case 'UPDATE_DATA_EXTENSIONS_SUCCESS':
      return {
        ...state,
        dataExtensions: action.payload.dataExtensions
      };
    case 'ADD_FILTER_DATA_JOB':
      return {
        ...state
      };
    case 'ADD_FILTER_DATA_JOB_SUCCESS':
      return {
        ...state,
        filterDataJob: action.payload.filterDataJob
      };
    case 'UPDATE_FILTER_DATA':
      return {
        ...state
      };
    case 'UPDATE_FILTER_DATA_SUCCESS':
      return {
        ...state,
        filterData: action.payload.filterData
      };
    case 'ADD_QUERIES_JOB':
      return {
        ...state
      };
    case 'ADD_QUERIES_JOB_SUCCESS':
      return {
        ...state,
        queriesJob: action.payload.queriesJob
      };
    case 'UPDATE_QUERIES':
      return {
        ...state
      };
    case 'UPDATE_QUERIES_SUCCESS':
      return {
        ...state,
        queries: action.payload.queries
      };
    case 'ADD_AUTOMATIONS_JOB':
      return {
        ...state
      };
    case 'ADD_AUTOMATIONS_JOB_SUCCESS':
      return {
        ...state,
        automationsJob: action.payload.automationsJob
      };
    case 'UPDATE_AUTOMATIONS':
      return {
        ...state
      };
    case 'UPDATE_AUTOMATIONS_SUCCESS':
      return {
        ...state,
        automations: action.payload.automations
      };
    case 'ADD_JOURNEYS_JOB':
      return {
        ...state
      };
    case 'ADD_JOURNEYS_JOB_SUCCESS':
      return {
        ...state,
        journeysJob: action.payload.journeysJob
      };
    case 'UPDATE_JOURNEYS':
      return {
        ...state
      };
    case 'UPDATE_JOURNEYS_SUCCESS':
      return {
        ...state,
        journeys: action.payload.journeys
      };
    case 'ADD_BUSINESS_UNITS_JOB':
      return {
        ...state
      };
    case 'ADD_BUSINESS_UNITS_JOB_SUCCESS':
      return {
        ...state,
        businessUnitsJob: action.payload.businessUnitsJob
      };
    case 'UPDATE_BUSINESS_UNITS':
      return {
        ...state
      };
    case 'UPDATE_BUSINESS_UNITS_SUCCESS':
      return {
        ...state,
        businessUnits: action.payload.businessUnits
      };
    case 'ADD_ACCOUNT_USERS_JOB':
      return {
        ...state
      };
    case 'ADD_ACCOUNT_USERS_JOB_SUCCESS':
      return {
        ...state,
        accountUsersJob: action.payload.accountUsersJob
      };
    case 'UPDATE_ACCOUNT_USERS':
      return {
        ...state
      };
    case 'UPDATE_ACCOUNT_USERS_SUCCESS':
      return {
        ...state,
        accountUsers: action.payload.accountUsers
      };
    case 'ADD_ROLES_JOB':
      return {
        ...state
      };
    case 'ADD_ROLES_JOB_SUCCESS':
      return {
        ...state,
        rolesJob: action.payload.rolesJob
      };
    case 'UPDATE_ROLES':
      return {
        ...state
      };
    case 'UPDATE_ROLES_SUCCESS':
      return {
        ...state,
        roles: action.payload.roles
      };
    default:
      return state;
  }
};

export { customMiddleWare, reducer };
