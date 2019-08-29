import * as actionTypes from './actionTypes';
export { actionTypes };

export const apiCall = ({route, dataType}) => actionTypes.API_CALL({route, dataType})
export const apiResponse = ({dataType, responseType}) => actionTypes.API_CALL({dataType, responseType})

export const addToys = data => actionTypes.ADD_TOYS({data})
export const addToy = data => actionTypes.ADD_TOY({data})

export const addBrands = data => actionTypes.ADD_BRANDS({data})
export const addCategories = data => actionTypes.ADD_CATEGORIES({data})



// export const updateCounter = counter => ({
//     type: UPDATE_COUNTER,
//     payload: {counter}
// })