import { createStore } from 'redux';
import { initialState, Reducer } from './reducer';

export const Store = () => {
    const store = createStore(Reducer, initialState);
    return store;
}