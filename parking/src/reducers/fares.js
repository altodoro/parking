import {
    FETCH_FARES_BEGIN,
    FETCH_FARES_SUCCESS,
    FETCH_FARES_FAILURE,
    FILTER_FARES_SUCCESS,
    CREATE_FARE_BEGIN,
    CREATE_FARE_SUCCESS,
    CREATE_FARE_FAILURE,
    SELECT_RATE,
    SELECT_FARE_TYPE,
} from '../actions/faresActions';

const initialState = {
    items: [],
    selectedRate: {
        rateID: '',
        name: '',
        description: '',
        fromDate: '',
        toDate: '',
    },
    createdRate: {
        rateID: '',
        name: '',
        description: '',
        fromDate: '',
        toDate: '',
    },
    selectedFareType: '',
    editDialog: false,
    type: '',
    loading: false,
    error: null
}

export function faresReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FARES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_FARES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.fares
            };
        case FETCH_FARES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case SELECT_RATE:
            const parkingZoneObj = action.payload.parkingZone;
            return {
                ...state,
                loading: false,
                error: null
            };
        case CREATE_FARE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_FARE_SUCCESS:
            return {
                ...state,
                loading: false,
                createdRate: action.payload.rate
            };
        case CREATE_FARE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case SELECT_FARE_TYPE:
            return {
                ...state,
                selectedFareType: action.payload.fareType,
                loading: false,
            }
        default:
            return state;
    }
}



