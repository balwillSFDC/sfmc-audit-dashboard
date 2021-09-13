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
        eventDataJob: action.payload.eventDataJob,
        eventDataJobState: action.payload.eventDataJobState
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB':
      return {
        ...state
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB_SUCCESS':
      return {
        ...state,
        eventData: action.payload.eventData,
        eventDataJobState: action.payload.eventDataJobState
      };
    case 'ADD_EMAIL_INVENTORY_JOB':
      return {
        ...state
      };
    case 'ADD_EMAIL_INVENTORY_JOB_SUCCESS':
      return {
        ...state,
        emailInventoryJob: action.payload.emailInventoryJob,
        emailInventoryJobState: action.payload.emailInventoryJobState
      };
    case 'UPDATE_EMAIL_INVENTORY':
      return {
        ...state
      };
    case 'UPDATE_EMAIL_INVENTORY_SUCCESS':
      return {
        ...state,
        emailInventory: action.payload.emailInventory,
        emailInventoryJobState: action.payload.emailInventoryJobState
      };
    case 'ADD_TEMPLATE_INVENTORY_JOB':
      return {
        ...state
      };
    case 'ADD_TEMPLATE_INVENTORY_JOB_SUCCESS':
      return {
        ...state,
        templateInventoryJob: action.payload.templateInventoryJob,
        templateInventoryJobState: action.payload.templateInventoryJobState
      };
    case 'UPDATE_TEMPLATE_INVENTORY':
      return {
        ...state
      };
    case 'UPDATE_TEMPLATE_INVENTORY_SUCCESS':
      return {
        ...state,
        templateInventory: action.payload.templateInventory,
        templateInventoryJobState: action.payload.templateInventoryJobState
      };
    case 'ADD_CATEGORIES_JOB':
      return {
        ...state
      };
    case 'ADD_CATEGORIES_JOB_SUCCESS':
      return {
        ...state,
        categoriesJob: action.payload.categoriesJob,
        categoriesJobState: action.payload.categoriesJobState
      };
    case 'UPDATE_CATEGORIES':
      return {
        ...state
      };
    case 'UPDATE_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload.categories,
        categoriesJobState: action.payload.categoriesJobState
      };
    case 'ADD_TRIGGERED_SENDS_JOB':
      return {
        ...state
      };
    case 'ADD_TRIGGERED_SENDS_JOB_SUCCESS':
      return {
        ...state,
        triggeredSendsJob: action.payload.triggeredSendsJob,
        triggeredSendsJobState: action.payload.triggeredSendsJobState
      };
    case 'UPDATE_TRIGGERED_SENDS':
      return {
        ...state
      };
    case 'UPDATE_TRIGGERED_SENDS_SUCCESS':
      return {
        ...state,
        triggeredSends: action.payload.triggeredSends,
        triggeredSendsJobState: action.payload.triggeredSendsJobState
      };
    case 'ADD_CLOUD_PAGES_JOB':
      return {
        ...state
      };
    case 'ADD_CLOUD_PAGES_JOB_SUCCESS':
      return {
        ...state,
        cloudPagesJob: action.payload.cloudPagesJob,
        cloudPagesJobState: action.payload.cloudPagesJobState
      };
    case 'UPDATE_CLOUD_PAGES':
      return {
        ...state
      };
    case 'UPDATE_CLOUD_PAGES_SUCCESS':
      return {
        ...state,
        cloudPages: action.payload.cloudPages,
        cloudPagesJobState: action.payload.cloudPagesJobState
      };
    case 'ADD_DATA_EXTENSIONS_JOB':
      return {
        ...state
      };
    case 'ADD_DATA_EXTENSIONS_JOB_SUCCESS':
      return {
        ...state,
        dataExtensionsJob: action.payload.dataExtensionsJob,
        dataExtensionsJobState: action.payload.dataExtensionsJobState
      };
    case 'UPDATE_DATA_EXTENSIONS':
      return {
        ...state
      };
    case 'UPDATE_DATA_EXTENSIONS_SUCCESS':
      return {
        ...state,
        dataExtensions: action.payload.dataExtensions,
        dataExtensionsJobState: action.payload.dataExtensionsJobState
      };
    case 'ADD_FILTER_DATA_JOB':
      return {
        ...state
      };
    case 'ADD_FILTER_DATA_JOB_SUCCESS':
      return {
        ...state,
        filterDataJob: action.payload.filterDataJob,
        filterDataJobState: action.payload.filterDataJobState
      };
    case 'UPDATE_FILTER_DATA':
      return {
        ...state
      };
    case 'UPDATE_FILTER_DATA_SUCCESS':
      return {
        ...state,
        filterData: action.payload.filterData,
        filterDataJobState: action.payload.filterDataJobState
      };
    case 'ADD_QUERIES_JOB':
      return {
        ...state
      };
    case 'ADD_QUERIES_JOB_SUCCESS':
      return {
        ...state,
        queriesJob: action.payload.queriesJob,
        queriesJobState: action.payload.queriesJobState
      };
    case 'UPDATE_QUERIES':
      return {
        ...state
      };
    case 'UPDATE_QUERIES_SUCCESS':
      return {
        ...state,
        queries: action.payload.queries,
        queriesJobState: action.payload.queriesJobState
      };
    case 'ADD_AUTOMATIONS_JOB':
      return {
        ...state
      };
    case 'ADD_AUTOMATIONS_JOB_SUCCESS':
      return {
        ...state,
        automationsJob: action.payload.automationsJob,
        automationsJobState: action.payload.automationsJobState
      };
    case 'UPDATE_AUTOMATIONS':
      return {
        ...state
      };
    case 'UPDATE_AUTOMATIONS_SUCCESS':
      return {
        ...state,
        automations: action.payload.automations,
        automationsJobState: action.payload.automationsJobState
      };
    case 'ADD_JOURNEYS_JOB':
      return {
        ...state
      };
    case 'ADD_JOURNEYS_JOB_SUCCESS':
      return {
        ...state,
        journeysJob: action.payload.journeysJob,
        journeysJobState: action.payload.journeysJobState
      };
    case 'UPDATE_JOURNEYS':
      return {
        ...state
      };
    case 'UPDATE_JOURNEYS_SUCCESS':
      return {
        ...state,
        journeys: action.payload.journeys,
        journeysJobState: action.payload.journeysJobState
      };
    case 'ADD_BUSINESS_UNITS_JOB':
      return {
        ...state
      };
    case 'ADD_BUSINESS_UNITS_JOB_SUCCESS':
      return {
        ...state,
        businessUnitsJob: action.payload.businessUnitsJob,
        businessUnitsJobState: action.payload.businessUnitsJobState
      };
    case 'UPDATE_BUSINESS_UNITS':
      return {
        ...state
      };
    case 'UPDATE_BUSINESS_UNITS_SUCCESS':
      return {
        ...state,
        businessUnits: action.payload.businessUnits,
        businessUnitsJobState: action.payload.businessUnitsJobState
      };
    case 'ADD_ACCOUNT_USERS_JOB':
      return {
        ...state
      };
    case 'ADD_ACCOUNT_USERS_JOB_SUCCESS':
      return {
        ...state,
        accountUsersJob: action.payload.accountUsersJob,
        accountUsersJobState: action.payload.accountUsersJobState
      };
    case 'UPDATE_ACCOUNT_USERS':
      return {
        ...state
      };
    case 'UPDATE_ACCOUNT_USERS_SUCCESS':
      return {
        ...state,
        accountUsers: action.payload.accountUsers,
        accountUsersJobState: action.payload.accountUsersJobState
      };
    case 'ADD_ROLES_JOB':
      return {
        ...state
      };
    case 'ADD_ROLES_JOB_SUCCESS':
      return {
        ...state,
        rolesJob: action.payload.rolesJob,
        rolesJobState: action.payload.rolesJobState
      };
    case 'UPDATE_ROLES':
      return {
        ...state
      };
    case 'UPDATE_ROLES_SUCCESS':
      return {
        ...state,
        roles: action.payload.roles,
        rolesJobState: action.payload.rolesJobState
      };
    case 'CHANGE_ACCOUNT_INVENTORY_SELECTED':
      return {
        ...state,
        accountInventorySelected: action.payload.accountInventorySelected
      }
    case 'CHANGE_EMAIL_ACTIVITY_SELECTED':
      return {
        ...state,
        emailActivitySelected: action.payload.emailActivitySelected
      }
    // Action delivers empty 'emailActivitySelected' prop
    case 'CLEAR_EMAIL_ACTIVITY_SELECTED':
      return {
        ...state,
        emailActivitySelected: action.payload.emailActivitySelected
      }
    case 'CLEAR_ACCOUNT_INVENTORY_SELECTED':
      return {
        ...state,
        accountInventorySelected: action.payload.accountInventorySelected
      }
    case 'ADD_SUBSCRIBERS_JOB': 
      return {
        ...state
      }
    case 'ADD_SUBSCRIBERS_JOB_SUCCESS': 
      return {
        ...state,
        subscribersJob: action.payload.subscribersJob,
        subscribersJobState: action.payload.subscribersJobState
      }
    case 'UPDATE_SUBSCRIBERS':
      return {
        ...state
      }
    case 'UPDATE_SUBSCRIBERS_SUCCESS':
      return {
        ...state,
        subscribers: action.payload.subscribers,
        subscribersJobState: action.payload.subscribersJobState
      }
    case 'CHANGE_SUBSCRIBERS_SUMMARY_SELECTED':
      return {
        ...state,
        subscribersSummarySelected: action.payload.subscribersSummarySelected
      }
    case 'CLEAR_SUBSCRIBERS_SUMMARY_SELECTED': 
      return {
        ...state,
        subscribersSummarySelected: action.payload.subscribersSummarySelected
      }
    case 'ADD_AUDIT_EVENTS_JOB':
      return {
        ...state
      }
    case 'ADD_AUDIT_EVENTS_JOB_SUCCESS': 
      return {
        ...state,
        auditEventsJob: action.payload.auditEventsJob,
        auditEventsJobState: action.payload.auditEventsJobState
      }
    case 'UPDATE_AUDIT_EVENTS':
      return {
        ...state
      }
    case 'UPDATE_AUDIT_EVENTS_SUCCESS':
      return {
        ...state,
        auditEvents: action.payload.auditEvents,
        auditEventsJobState: action.payload.auditEventsJobState
      }
    case 'ADD_JOURNEY_AUDIT_LOG_JOB':
      return {
        ...state
      }
    case 'ADD_JOURNEY_AUDIT_LOG_JOB_SUCCESS':
      return {
        ...state,
        journeyAuditLogJob: action.payload.journeyAuditLogJob,
        journeyAuditLogJobState: action.payload.journeyAuditLogJobState
      }
    case 'UPDATE_JOURNEY_AUDIT_LOG':
      return {
        ...state
      }
    case 'UPDATE_JOURNEY_AUDIT_LOG_SUCCESS':
      return {
        ...state,
        journeyAuditLog: action.payload.journeyAuditLog,
        journeyAuditLogJobState: action.payload.journeyAuditLogJobState
      }
    case 'TOGGLE_JOURNEY_DETAIL_MODAL':
      return {
        ...state,
        isOpenJourneyDetailModal: action.payload.isOpenJourneyDetailModal
      }
    case 'CHANGE_JOURNEY_DETAIL_SELECTED':
      return {
        ...state,
        journeyDetailSelected: action.payload.journeyDetailSelected
      }
    case 'ADD_GET_JOURNEY_DETAILS_JOB':
      return {
        ...state
      }
    case 'ADD_GET_JOURNEY_DETAILS_JOB_SUCCESS':
      return {
        ...state,
        journeyDetailsJob: action.payload.journeyDetailsJob,
        journeyDetailsJobState: action.payload.journeyDetailsJobState
      }
    case 'UPDATE_JOURNEY_DETAILS':
      return {
        ...state
      }
    case 'UPDATE_JOURNEY_DETAILS_SUCCESS':
      return {
        ...state,
        journeyDetails: action.payload.journeyDetails,
        journeyDetailsJobState: action.payload.journeyDetailsJobState
      }
    default:
      return state;
  }
};

export { customMiddleWare, reducer };
