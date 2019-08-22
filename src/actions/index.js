import * as actionTypes from './actionTypes';
export {actionTypes};

export const updateCounter = counter => actionTypes.UPDATE_COUNTER({counter})


// export const updateCounter = counter => ({
//     type: UPDATE_COUNTER,
//     payload: {counter}
// })