import {combineReducers} from 'redux';

import {menusReducer} from './menusReducer';
import {dailyReducer} from './dailyReducer';

const appReducer = combineReducers({
    menusReducer,
    dailyReducer
});

export {appReducer}
