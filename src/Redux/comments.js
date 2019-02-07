import { COMMENTS } from '../Shared/comments';
import * as ActionTypes from './types';

export const Comments = function (state = COMMENTS, action) {
    // console.log(state);
    console.log(action);
    console.log(state);
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log('Comment : ', comment);
            return state.concat(comment);
        default:
            return state
    };
};