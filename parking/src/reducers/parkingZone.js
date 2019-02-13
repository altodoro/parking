import {
  PARKING_ZONE_SELECTED,
} from '../actions/parkingZoneActions';

const [
    parkingID, parkingZone, parkingSapCode, parkingCity
] = [
    localStorage.getItem('selectedParkingZoneID'),
    localStorage.getItem('selectedParkingZone'),
    localStorage.getItem('selectedParkingSapCode'),
    localStorage.getItem('selectedParkingCity')
];

const initialState = (!([parkingZone, parkingSapCode, parkingCity, parkingID].some(_ => _ == null && _ === 'undefined')) && {
    name: parkingZone,
    sapCode: parkingSapCode,
    parkingCity: parkingCity,
    parkingID: parkingID
}) || {
    name: '',
    parkingID: '',
    parkingCity: '',
    sapCode: ''
};

export function parkingZoneReducer(state = initialState, action) {
  switch(action.type) {
    case PARKING_ZONE_SELECTED:
        console.log('state -->', state, 'payload --->', action.payload.parkingZone);
        const parkingZoneObj = action.payload.parkingZone;
        const [parkingID, name, sapCode, parkingCity] = [parkingZoneObj.id, parkingZoneObj.name, parkingZoneObj.sapCode, parkingZoneObj.city];
        localStorage.setItem('selectedParkingZoneID', parkingID);
        localStorage.setItem('selectedParkingZone', name);
        localStorage.setItem('selectedParkingSapCode', sapCode);
        localStorage.setItem('selectedParkingCity', parkingCity);
        return {
            ...state,
            name: name,
            sapCode: sapCode,
            parkingCity: parkingCity,
            parkingID: parkingID,
            loading: true,
            error: null
        };
    default:
      return state;
  }
}