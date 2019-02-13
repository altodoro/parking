import { combineReducers } from 'redux';
import { parkingsReducer } from './parkingsReducer';
import { parkingZoneReducer as parkingZone } from './parkingZone';
import { faresReducer as fares } from './fares';

const rootReducer = combineReducers({
    parkingsReducer,
    parkingZone,
    fares,
  // authentication,
});

export default rootReducer;