import {
  FETCH_PARKINGS_BEGIN,
  FETCH_PARKINGS_SUCCESS,
  FETCH_PARKINGS_FAILURE,
  FETCH_CITIES_BEGIN,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FILTER_PARKINGS_SUCCESS,
} from '../actions/parkingsListActions';

const initialState = {
    parkings: [],
    cities: [],
    loading: false,
    error: null
};

export function parkingsReducer(state = initialState, action) {
  switch(action.type) {
    case  FETCH_CITIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_CITIES_SUCCESS:
      return {
          ...state,
          loading: false,
          cities: action.payload.cities
        };
    case FETCH_CITIES_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            cities: []
        };
    case FETCH_PARKINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        parkings: action.payload.parkings
      };

    case FETCH_PARKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        parkings: []
      };

    case FILTER_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        parkings: action.payload.parkings
      };

    default:
      return state;
  }
}
