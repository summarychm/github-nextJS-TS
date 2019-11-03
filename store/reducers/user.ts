const initialState = {};
import { eUserType } from '../action-types';
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case eUserType.LOGOUT:
            return {};
        default:
            return state;
    }
}
