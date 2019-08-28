import * as actionTypes from './actionTypes';
export { actionTypes };

export const updateCounter = counter => actionTypes.UPDATE_COUNTER({counter})

export const fetchData = route => actionTypes.FETCH_DATA({route})

export const addToys = data => actionTypes.ADD_TOY({data})

// export const updateCounter = counter => ({
//     type: UPDATE_COUNTER,
//     payload: {counter}
// })