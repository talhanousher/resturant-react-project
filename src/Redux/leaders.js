import { LEADERS } from '../Shared/leaders';

export const initialState = {
    leaders: LEADERS
};

export const Leaders = function (state = initialState, action) {
    switch (action.type) {
        default:
            return state
    };
};