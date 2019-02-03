import { DISHES } from '../Shared/dishes';

export const initialState = {
    dishes: DISHES
};

export const Dishes = function (state = initialState, action) {
    switch (action.type) {
        default:
            return state
    };
};