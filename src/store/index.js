// import {
//     legacy_createStore as createStore,
//     combineReducers,
//     compose,
//     applyMiddleware
// } from 'redux';

import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk'

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/fitersSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    } else {
        return next(action);
    }
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         } else {
//             return oldDispatch(action);
//         }
//     }
//     return store;
// }

// const store = createStore(combineReducers({ heroes, filters }),
//     compose(
//         applyMiddleware(stringMiddleware, ReduxThunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;