import * as dailyDetailAction from '../actions/dailyDetailAction';

const init = {
    id: '',
};

const dailyDetailReducer = (state = init, action) => {

    switch (action.type) {
        case dailyDetailAction.ID:
            return {...state, id: action.id};

        default:
            return state;
    }
};

export {dailyDetailReducer}