import { parkingsListService } from '../services';
import { history } from '../History';

export const parkingZoneActions = {
    setParkingZone,
}

function setParkingZone(parkingZone) {
    return dispatch => {
        dispatch(changeParkingZone(parkingZone));
        history.push('/board');
        return {parkingZone: parkingZone};
    }
}

export const PARKING_ZONE_SELECTED = "PARKING_ZONE_SELECTED";

export const changeParkingZone = parkingZone => ({
  type: PARKING_ZONE_SELECTED,
  payload: { parkingZone }
});