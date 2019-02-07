import * as ActionTypes from './types';

export const addComment = function (dishId, rating, author, comment) {
    return ({
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
    });
};