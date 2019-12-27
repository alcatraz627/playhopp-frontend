import * as actionTypes from './actionTypes';
import { API_METHODS } from '../constants/api';
export { actionTypes };

export const cartAdd = ({item}) => actionTypes.CART_ADD({item})
export const cartRemove = ({item}) => actionTypes.CART_REMOVE({item})

export const cartFill = ({toys}) => actionTypes.CART_FILL({toys})
export const cartEmpty = () => actionTypes.CART_EMPTY()

export const toggleDrawer = ({open}) => actionTypes.TOGGLE_DRAWER({open})
export const setNotif = ({message}) => actionTypes.SET_NOTIF({message})

export const setUser = (data, status) => actionTypes.SET_USER({data, status})

export const apiCall = ({route, dataType, method, data, auth}) => actionTypes.API_CALL({route, dataType, method, data, auth})
export const apiResponse = ({dataType, responseType}) => actionTypes.API_CALL({dataType, responseType})

export const addToys = data => actionTypes.ADD_TOYS({data})
export const addToy = data => actionTypes.ADD_TOY({data})

export const addBrands = data => actionTypes.ADD_BRANDS({data})
export const addCategories = data => actionTypes.ADD_CATEGORIES({data})

export const loginSuccess = data => actionTypes.LOGIN_SUCCESS({data})
export const loginFail = data => actionTypes.LOGIN_FAIL({data})

export const logout = data => actionTypes.LOGOUT()

export const signupSuccess = data => actionTypes.SIGNUP_SUCCESS({data})
export const signupFail = data => actionTypes.SIGNUP_FAIL({data})

export const submitSubscription = data => actionTypes.SUBMIT_SUBSCRIPTION({data})