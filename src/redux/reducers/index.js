import {combineReducers} from 'redux';

import {menusReducer} from './menusReducer';
import {dailyDetailReducer} from './dailyDetailReducer';
import {movieDetailsReducer} from './movieDetailsReducer';

const appReducer = combineReducers({
    menusReducer,
    dailyDetailReducer,
    movieDetailsReducer
});

export {appReducer}
