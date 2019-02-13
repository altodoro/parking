import { parkingsListService } from '../services';
import { history } from '../History';

import _ from 'lodash';

export const parkingsListActions = {
    fetchParkings,
    fetchCities,
    filterParkings,
}

function fetchParkings() {
  return dispatch => {
    dispatch(fetchParkingsBegin());
    return parkingsListService.getAll()
      .then(parkings => {
        dispatch(fetchParkingsSuccess(parkings.parkings));
        dispatch(fetchCities(parkings.parkings))
        return parkings.parkings;
      })
      .catch(error =>
        dispatch(fetchParkingsFailure(error))
      );
  };
}

function filterParkings(cityID) {
  return dispatch => {
    return parkingsListService.getAll()
      .then(parkings => {
        const result = cityID == "" ? parkings.parkings : parkings.parkings.filter(function(parking) {
            return parking.city === cityID;
        });
        dispatch(fetchParkingsSuccess(result));
        return {cityID: cityID, parkings: result};
      })
      .catch(error =>
        dispatch(fetchParkingsFailure(error))
      );
  };
}

function fetchCities(parkings) {
    return dispatch => {
        dispatch(fetchCitiesBegin(parkings));
        try {
            const cities = _.uniqBy(parkings.map(parking => {
                return {
                    'id': parking.sapCode,
                    'city': parking.city
                }
            }), 'city');
            dispatch(fetchCitiesSuccess(cities));
            return cities;
        } catch (error) {
            dispatch(fetchCitiesFailure(error));
        }
    };
}


export const FETCH_CITIES_BEGIN = "FETCH_CITIES_BEGIN";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";

export const fetchCitiesBegin = () => ({
  type: FETCH_CITIES_BEGIN
});

export const fetchCitiesSuccess = cities => ({
  type: FETCH_CITIES_SUCCESS,
  payload: { cities }
});

export const fetchCitiesFailure = error => ({
  type: FETCH_CITIES_FAILURE,
  payload: { error }
});

export const FETCH_PARKINGS_BEGIN = "FETCH_PARKINGS_BEGIN";
export const FETCH_PARKINGS_SUCCESS = "FETCH_PARKINGS_SUCCESS";
export const FETCH_PARKINGS_FAILURE = "FETCH_PARKINGS_FAILURE";

export const FILTER_PARKINGS_SUCCESS = "FILTER_PARKINGS_SUCCESS";

export const fetchParkingsBegin = (cityID) => ({
  type: FETCH_PARKINGS_BEGIN,
  payload: { cityID }
});

export const fetchParkingsSuccess = parkings => ({
  type: FETCH_PARKINGS_SUCCESS,
  payload: { parkings }
});

export const fetchParkingsFailure = error => ({
  type: FETCH_PARKINGS_FAILURE,
  payload: { error }
});

export const filterParkingsSuccess = result => ({
  type: FILTER_PARKINGS_SUCCESS,
  payload: { result }
});
