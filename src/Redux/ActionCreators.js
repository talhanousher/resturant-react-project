import * as ActionTypes from './types';

import { baseUrl } from '../Shared/baseURL'

export const addComment = function (dishId, rating, author, comment) {
    console.log('Add Comments');
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

export const fetchDishes = () => (dispatch) => {
    console.log('Fetch Dishes')
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then(res => res.json())
        .then(dishes => {
            console.log(dishes);
            dispatch(addDishes(dishes))
        });
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    console.log('Fetch Promos');
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}


export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});