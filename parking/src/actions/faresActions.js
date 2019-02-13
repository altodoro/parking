import { parkingFaresService } from '../services';
import { parkingsListActions } from './parkingsListActions';
import { history } from '../History';

import _ from 'lodash';

export const faresActions = {
    fetchFares,
    changeFare,
    createFare,
    selectFareType,
}

function fetchFares(parkingZoneID) {
    return dispatch => {
        if (!parkingZoneID) {
            history.push('/selectionform');
            return false;
        }
        dispatch(fetchFaresBegin());
        return parkingFaresService.getAll(parkingZoneID)
            .then(fares => {
                // dispatch(parkingsListActions.fetchParkings()).then(function(){
                  
                dispatch(fetchFaresSuccess(fares.fares));
                return fares.fares;
                // });
            })
            .catch(error =>
                dispatch(fetchFaresFailure(error))
            );
    };
}

function changeFare() {
    // return dispatch => {
    
    // }
}

function createFare(parkingZoneID, fareObject) {
    return dispatch => {
        dispatch(createFareBegin(parkingZoneID, fareObject));
        return parkingFaresService.createFare(parkingZoneID, fareObject).then(result => {
            dispatch(createFareSuccess(result));
            dispatch(fetchFares(parkingZoneID));
            return result;
        })
        .catch(error =>
            dispatch(createFareFailure(error))
        );
    }
}

function selectFareType(fareType) {
  return dispatch => {
    console.log(fareType);
    dispatch(selectSessionFareType(fareType))
  }
}

function openFare(fareObject) {
  return dispatch => {
    dispatch(selectFareToOpen(fareObject));
    dispatch(fareObjectLoaded(fareObject));
  }
}

export const FETCH_FARES_BEGIN = "FETCH_FARES_BEGIN";
export const FETCH_FARES_SUCCESS = "FETCH_FARES_SUCCESS";
export const FETCH_FARES_FAILURE = "FETCH_FARES_FAILURE";
export const FILTER_FARES_SUCCESS = "FILTER_FARES_SUCCESS";
export const CREATE_FARE_BEGIN = "CREATE_FARE_BEGIN";
export const CREATE_FARE_SUCCESS = "CREATE_FARE_SUCCESS";
export const CREATE_FARE_FAILURE = "CREATE_FARE_FAILURE";
export const SELECT_RATE = "FILTER_FARES_SUCCESS";
export const SELECT_FARE_TYPE = "SELECT_FARE_TYPE";
export const OPEN_FARE_INSTANCE_BEGIN = "OPEN_FARE_INSTANCE_BEGIN";
export const OPEN_FARE_INSTANCE_SUCCESS = "OPEN_FARE_INSTANCE_SUCCESS";
export const OPEN_FARE_INSTANCE_FAILURE = "OPEN_FARE_INSTANCE_FAILURE";
export const OPEN_FARE_INSTANCE = "OPEN_FARE_INSTANCE";


export const fetchFaresBegin = (sapCode) => ({
  type: FETCH_FARES_BEGIN,
  payload: { sapCode }
});

export const fetchFaresSuccess = fares => ({
  type: FETCH_FARES_SUCCESS,
  payload: { fares }
});

export const fetchFaresFailure = error => ({
  type: FETCH_FARES_FAILURE,
  payload: { error }
});

export const filterFaresSuccess = result => ({
  type: FILTER_FARES_SUCCESS,
  payload: { result }
});

export const createFareBegin = (parkingCityID, fareObject) => ({
  type: CREATE_FARE_BEGIN,
  payload: { fareObject }
});

export const createFareSuccess = result => ({
  type: CREATE_FARE_SUCCESS,
  payload: { result }
});

export const createFareFailure = error => ({
  type: CREATE_FARE_FAILURE,
  payload: { error }
});

export const selectSessionFareType = fareType => ({
  type: SELECT_FARE_TYPE,
  payload: { fareType }
});

export const selectFareToOpen = fareObject => ({
  type: OPEN_FARE_INSTANCE_BEGIN,
  payload: { fareObject }
});

export const fareObjectLoaded = fareObject => ({
  type: OPEN_FARE_INSTANCE_SUCCESS,
  payload: { fareObject }
});

export const fareObjectLoadFailed = fareObject => ({
  type: OPEN_FARE_INSTANCE_FAILURE,
  payload: { fareObject }
});