import * as movieDetailsAction from '../actions/movieDetailsAction';

const initData = {
    id: '',
};

const movieDetailsReducer = (state = initData, action) => {

    switch (action.type) {
        case movieDetailsAction.MovieId:
            return {
                ...state, id: action.id
            };
        default:
            return state;
    }
};

export {movieDetailsReducer}