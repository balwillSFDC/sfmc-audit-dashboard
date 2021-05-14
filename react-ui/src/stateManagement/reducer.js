import initialState from './initialState';

const customMiddleWare = (store) => (next) => (action) => {
  // Custom Middleware
  // ...

  return next(action);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_NAME':
      return {
        ...state
      };
    default:
      return state;
  }
};

export { customMiddleWare, reducer };
