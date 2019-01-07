import {combineReducers} from 'redux';

import {menusReducer} from './menusReducer';

const appReducer = combineReducers({
    menusReducer
});

export {appReducer}
