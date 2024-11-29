// import { createStore, applyMiddleware } from 'redux';
import { configureStore} from '@reduxjs/toolkit'
// import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {}; // The initial state of the Redux store.

// --- using createStore ---

// const middleware = [thunk];
// const middleware = [thunk]; // An array of thunk middleware
/* thunk: Its a middleware. Its primary purpose is to allow you to write action creators that return a function instead of an action. 
This is particularly useful for handling asynchronous operations in Redux. */

// const store = createStore(
//   rootReducer, // combines all the application's reducers.
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware)) //  enable integration with the Redux DevTools extension for debugging
// );


// --- Create redux store using configureStore ---

const store = configureStore({
    reducer: rootReducer, // reducer handles state updates
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // thunk: Its a middleware. Its primary purpose is to allow you to write action creators that return a function instead of an action.
    preloadedState: initialState, // The initial state of the Redux store.
});


export default store;