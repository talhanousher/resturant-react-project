import * as ActionTypes from './types';

export const Comments = function (state = { errMess: null, comments: [] }, action) {
    console.log(action.type);    
    console.log(action.payload);
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            // console.log('Comment : ', comment);
            return { ...state, comments: state.comments.concat(comment) }
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload }
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload }
        default:
            return state
    }
};