import * as menusAction from '../actions/menusAction';

const initData = {
    index: 0,
};

const menusReducer = (state = initData, action) => {

    switch (action.type) {
        case menusAction.MENU_CLICK:
            return {
                ...state, index: action.index
            };
        default:
            return state;
    }
};

export {menusReducer}