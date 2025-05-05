// third-party
import { combineReducers } from 'redux';
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import shipmentReducer from './slices/shipment';
import medicReducer from './slices/medic';
import patientReducer from './slices/patient';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    customer: customerReducer,
    shipment: shipmentReducer,
    medic: medicReducer,
    patient: patientReducer
});

export default reducer;
