import axios from 'axios';

// insert actions below
// ex. export function handleInput = (e) => { type: 'INPUT CHANGE', payload: { input: e.target.value }}

export const addEventDataJob = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_GET_ALL_EVENT_DATA_JOB_REQUEST'
    });

    try {
      let response = await axios.post('api/getAllEventData');

      dispatch({
        type: 'ADD_GET_ALL_EVENT_DATA_JOB_SUCCESS',
        payload: {
          eventDataJob: response.data.id
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
      type: 'UPDATE_GET_ALL_EVENT_DATA_JOB_REQUEST'
    });

    try {
      let response = await axios.get(`api/getAllEventData/${id}`);

      if (response.data.state === 'completed') {
        dispatch({
          type: 'UPDATE_GET_ALL_EVENT_DATA_JOB_SUCCESS',
          payload: {
            eventData: response.data.result
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

export const addEmailInventoryJob = () => {};

export const updateEmailInventoryJob = () => {};
