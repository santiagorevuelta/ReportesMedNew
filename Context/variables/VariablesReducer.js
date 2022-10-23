import {DELETE_VARIABLES, UPDATE_VARIABLES} from '../Types';

export default (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case UPDATE_VARIABLES:
            return {...payload};
        case DELETE_VARIABLES:
            if (payload) {
                delete state[payload];
                return {};
            } else {
                return {};
            }
        default:
            return state;
    }
};
