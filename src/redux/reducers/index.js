import {combineReducers} from 'redux';

import {menusReducer} from './menusReducer';
import {dailyDetailReducer} from './dailyDetailReducer';

const appReducer = combineReducers({
    menusReducer,
    dailyDetailReducer,
});

export {appReducer}
