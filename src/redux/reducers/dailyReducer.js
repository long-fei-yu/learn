import * as dailyAction from '../actions/dailyAction';

const init = {
    title: '知乎日报',
};

const dailyReducer = (state = init, action) => {

    switch (action.type) {
        case dailyAction.SLIDE:
            return {...state, title: action.title};

        default:
            return state;
    }
};

export {dailyReducer}