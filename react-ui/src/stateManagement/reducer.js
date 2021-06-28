import initialState from './initialState';

const customMiddleWare = (store) => (next) => (action) => {
  // Custom Middleware
  // ...

  return next(action);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GET_ALL_EVENT_DATA_JOB_REQUEST':
      return {
        ...state
      };
    case 'ADD_GET_ALL_EVENT_DATA_JOB_SUCCESS':
      return {
        ...state,
        eventDataJob: action.payload.eventDataJob
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB_REQUEST':
      return {
        ...state
      };
    case 'UPDATE_GET_ALL_EVENT_DATA_JOB_SUCCESS':
      return {
        ...state,
        eventData: action.payload.eventData
      };
    default:
      return state;
  }
};

export { customMiddleWare, reducer };
