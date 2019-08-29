// import {collection} from './models'
import {API_STATES, API_DATA_TYPE} from './api'


const initialState = {
    api: {
        [API_DATA_TYPE.TOYS]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.TOY]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.BRANDS]: API_STATES.NOT_FETCHED,
        [API_DATA_TYPE.CATEGORIES]: API_STATES.NOT_FETCHED,
    },
    // toys: [...collection],
    [API_DATA_TYPE.TOYS]: {},

    [API_DATA_TYPE.BRANDS]: {},
    [API_DATA_TYPE.CATEGORIES]: {},

    cart: {}
};

export default initialState;