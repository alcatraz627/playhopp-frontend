import {collection} from './models'

const initialState = {
    counter: 2,
    toys: [...collection],
};

export default initialState;