import { API_STATES, API_DATA_TYPE } from './api'

const initialState = {
    api: {
        [API_DATA_TYPE.TOYS]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.BRANDS]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.CATEGORIES]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.USER]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.HOPPLIST]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.CARTITEM]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.SUBSCRIPTION]: API_STATES.NOT_FETCHED,
    },
    [API_DATA_TYPE.TOYS]: {},

    [API_DATA_TYPE.BRANDS]: {},
    [API_DATA_TYPE.CATEGORIES]: {},

    cart: {},
    general: {
        isCartOpen: false
    },
    user: {
        token: null,
        username: null,
        contact_number: null,
        first_name: null,
        address: null,
        profile_pic: null,
    },
    subscription: {},
};

export default initialState;