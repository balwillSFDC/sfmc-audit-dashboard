import axios from 'axios';

// insert actions below
// ex. export function handleInput = (e) => { type: 'INPUT CHANGE', payload: { input: e.target.value }}

export const addEventDataJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_GET_ALL_EVENT_DATA_JOB'
    });

    try {
      let response = await axios.post('api/getAllEventData');

      dispatch({
        type: 'ADD_GET_ALL_EVENT_DATA_JOB_SUCCESS',
        payload: {
          eventDataJob: response.data.id,
          eventDataJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_GET_ALL_EVENT_DATA_JOB_ERROR'
      });
    }
  };
};

export const updateEventDataJob = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_GET_ALL_EVENT_DATA_JOB'
    });

    try {
      let response = await axios.get(`api/getAllEventData/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_GET_ALL_EVENT_DATA_JOB_SUCCESS',
          payload: {
            eventData: response.data.result,
            eventDataJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_GET_ALL_EVENT_DATA_JOB_ERROR'
      });
    }
  };
};

export const addEmailInventoryJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_EMAIL_INVENTORY_JOB'
    });

    try {
      let response = await axios.post('api/getEmailInventory');

      dispatch({
        type: 'ADD_EMAIL_INVENTORY_JOB_SUCCESS',
        payload: {
          emailInventoryJob: response.data.id,
          emailInventoryJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_EMAIL_INVENTORY_JOB_ERROR'
      });
    }
  };
};

export const updateEmailInventoryJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_EMAIL_INVENTORY'
    });

    try {
      let response = await axios.get(`api/getEmailInventory/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_EMAIL_INVENTORY_SUCCESS',
          payload: {
            emailInventory: response.data.result,
            emailInventoryJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_EMAIL_INVENTORY_ERROR'
      });
    }
  };
};

export const addTemplateInventoryJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_TEMPLATE_INVENTORY_JOB'
    });

    try {
      let response = await axios.post('api/getTemplateinventory');

      dispatch({
        type: 'ADD_TEMPLATE_INVENTORY_JOB_SUCCESS',
        payload: {
          templateInventoryJob: response.data.id,
          templateInventoryJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_TEMPLATE_INVENTORY_JOB_ERROR'
      });
    }
  };
};

export const updateTemplateInventoryJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_TEMPLATE_INVENTORY'
    });

    try {
      let response = await axios.get(`api/getTemplateInventory/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_TEMPLATE_INVENTORY_SUCCESS',
          payload: {
            templateInventory: response.data.result,
            templateInventoryJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_TEMPLATE_INVENTORY_ERROR'
      });
    }
  };
};

export const addCategoriesJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_CATEGORIES_JOB'
    });

    try {
      let response = await axios.post('api/getCategories');

      dispatch({
        type: 'ADD_CATEGORIES_JOB_SUCCESS',
        payload: {
          categoriesJob: response.data.id,
          categoriesJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_CATEGORIES_JOB_ERROR'
      });
    }
  };
};

export const updateCategoriesJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_CATEGORIES'
    });

    try {
      let response = await axios.get(`api/getCategories/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_CATEGORIES_SUCCESS',
          payload: {
            categories: response.data.result,
            categoriesJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_CATEGORIES_ERROR'
      });
    }
  };
};

export const addTriggeredSendsJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_TRIGGERED_SENDS_JOB'
    });

    try {
      let response = await axios.post('api/getTriggeredSends');

      dispatch({
        type: 'ADD_TRIGGERED_SENDS_JOB_SUCCESS',
        payload: {
          triggeredSendsJob: response.data.id,
          triggeredSendsJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_TRIGGERED_SENDS_JOB_ERROR'
      });
    }
  };
};

export const updateTriggeredSendsJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_TRIGGERED_SENDS'
    });

    try {
      let response = await axios.get(`api/getTriggeredSends/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_TRIGGERED_SENDS_SUCCESS',
          payload: {
            triggeredSends: response.data.result,
            triggeredSendsJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_TRIGGERED_SENDS_ERROR'
      });
    }
  };
};

export const addCloudPagesJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_CLOUD_PAGES_JOB'
    });

    try {
      let response = await axios.post('/api/getCloudPage');

      dispatch({
        type: 'ADD_CLOUD_PAGES_JOB_SUCCESS',
        payload: {
          cloudPagesJob: response.data.id,
          cloudPagesJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_CLOUD_PAGES_JOB_ERROR'
      });
    }
  };
};

export const updateCloudPagesJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_CLOUD_PAGES'
    });

    try {
      let response = await axios.get(`/api/getCloudPage/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_CLOUD_PAGES_SUCCESS',
          payload: {
            cloudPages: response.data.result,
            cloudPagesJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_CLOUD_PAGES_ERROR'
      });
    }
  };
};

export const addDataExtensionsJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_DATA_EXTENSIONS_JOB'
    });

    try {
      let response = await axios.post('/api/getAllDataExtensions');

      dispatch({
        type: 'ADD_DATA_EXTENSIONS_JOB_SUCCESS',
        payload: {
          dataExtensionsJob: response.data.id,
          dataExtensionsJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_DATA_EXTENSIONS_JOB_ERROR'
      });
    }
  };
};

export const updateDataExtensionsJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_DATA_EXTENSIONS'
    });

    try {
      let response = await axios.get(`/api/getAllDataExtensions/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_DATA_EXTENSIONS_SUCCESS',
          payload: {
            dataExtensions: response.data.result,
            dataExtensionsJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_DATA_EXTENSIONS_ERROR'
      });
    }
  };
};

export const addFilterDataJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_FILTER_DATA_JOB'
    });

    try {
      let response = await axios.post('/api/getFilterData');

      dispatch({
        type: 'ADD_FILTER_DATA_JOB_SUCCESS',
        payload: {
          filterDataJob: response.data.id,
          filterDataJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_FILTER_DATA_JOB_ERROR'
      });
    }
  };
};

export const updateFilterDataJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_FILTER_DATA'
    });

    try {
      let response = await axios.get(`/api/getFilterData/${id}`);

      if (response.data.state === 'completed') {

        dispatch({
          type: 'UPDATE_FILTER_DATA_SUCCESS',
          payload: {
            filterData: response.data.result,
            filterDataJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_FILTER_DATA_ERROR'
      });
    }
  };
};

export const addQueriesJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_QUERIES_JOB'
    });

    try {
      let response = await axios.post('/api/getQueries');

      dispatch({
        type: 'ADD_QUERIES_JOB_SUCCESS',
        payload: {
          queriesJob: response.data.id,
          queriesJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_QUERIES_JOB_ERROR'
      });
    }
  };
};

export const updateQueriesJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_QUERIES'
    });

    try {
      let response = await axios.get(`/api/getQueries/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_QUERIES_SUCCESS',
          payload: {
            queries: response.data.result,
            queriesJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_QUERIES_ERROR'
      });
    }
  };
};

export const addAutomationsJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_AUTOMATIONS_JOB'
    });

    try {
      let response = await axios.post('/api/getAutomations');

      dispatch({
        type: 'ADD_AUTOMATIONS_JOB_SUCCESS',
        payload: {
          automationsJob: response.data.id,
          automationsJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_AUTOMATIONS_JOB_ERROR'
      });
    }
  };
};

export const updateAutomationsJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_AUTOMATIONS'
    });

    try {
      let response = await axios.get(`/api/getAutomations/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_AUTOMATIONS_SUCCESS',
          payload: {
            automations: response.data.result,
            automationsJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_AUTOMATIONS_ERROR'
      });
    }
  };
};

export const addJourneysJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_JOURNEYS_JOB'
    });

    try {
      let response = await axios.post('/api/getJourneys');

      dispatch({
        type: 'ADD_JOURNEYS_JOB_SUCCESS',
        payload: {
          journeysJob: response.data.id,
          journeysJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_JOURNEYS_JOB_ERROR'
      });
    }
  };
};

export const updateJourneysJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_JOURNEYS'
    });

    try {
      let response = await axios.get(`/api/getJourneys/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_JOURNEYS_SUCCESS',
          payload: {
            journeys: response.data.result,
            journeysJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_JOURNEYS_ERROR'
      });
    }
  };
};

export const addBusinessUnitsJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_BUSINESS_UNITS_JOB'
    });

    try {
      let response = await axios.post('/api/getBusinessUnits');

      dispatch({
        type: 'ADD_BUSINESS_UNITS_JOB_SUCCESS',
        payload: {
          businessUnitsJob: response.data.id,
          businessUnitsJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_BUSINESS_UNITS_JOB_ERROR'
      });
    }
  };
};

export const updateBusinessUnitsJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_BUSINESS_UNITS'
    });

    try {
      let response = await axios.get(`/api/getBusinessUnits/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_BUSINESS_UNITS_SUCCESS',
          payload: {
            businessUnits: response.data.result,
            businessUnitsJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_BUSINESS_UNITS_ERROR'
      });
    }
  };
};

export const addAccountUsersJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_ACCOUNT_USERS_JOB'
    });

    try {
      let response = await axios.post('/api/getAccountUsers');

      dispatch({
        type: 'ADD_ACCOUNT_USERS_JOB_SUCCESS',
        payload: {
          accountUsersJob: response.data.id,
          accountUsersJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_ACCOUNT_USERS_JOB_ERROR'
      });
    }
  };
};

export const updateAccountUsersJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_ACCOUNT_USERS'
    });

    try {
      let response = await axios.get(`/api/getAccountUsers/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_ACCOUNT_USERS_SUCCESS',
          payload: {
            accountUsers: response.data.result,
            accountUsersJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_ACCOUNT_USERS_ERROR'
      });
    }
  };
};

export const addRolesJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_ROLES_JOB'
    });

    try {
      let response = await axios.post('/api/getRoles');

      dispatch({
        type: 'ADD_ROLES_JOB_SUCCESS',
        payload: {
          rolesJob: response.data.id,
          rolesJobState: response.data.state
        }
      });
    } catch (e) {
      dispatch({
        type: 'ADD_ROLES_JOB_ERROR'
      });
    }
  };
};

export const updateRolesJob = (id) => {
   return async (dispatch) => {
    dispatch({
      type: 'UPDATE_ROLES'
    });

    try {
      let response = await axios.get(`/api/getRoles/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_ROLES_SUCCESS',
          payload: {
            roles: response.data.result,
            rolesJobState: response.data.state
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'UPDATE_ROLES_ERROR'
      });
    }
  };
};

export const changeAccountInventorySelected = (accountInventorySelected) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHANGE_ACCOUNT_INVENTORY_SELECTED',
      payload: { 
        accountInventorySelected: accountInventorySelected
      }
    })
  }
}

export const changeEmailActivitySelected = (emailActivitySelected) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHANGE_EMAIL_ACTIVITY_SELECTED',
      payload: { 
        emailActivitySelected: emailActivitySelected
      }
    })
  }
}