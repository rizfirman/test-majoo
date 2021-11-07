import { FETCH_PENDING_DATA, FETCH_FINISH_DATA } from "./types";


const initialState = {
    pendingData: [],
    finishData: [],
    loading: true
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_PENDING_DATA:
            return {
                ...state,
                pendingData: action.payload,
                loading: false
                
            }
        case FETCH_FINISH_DATA:
            return {
                ...state,
                finishData: action.payload,
                loading: false
            }
        default:
            return state;
    }
}