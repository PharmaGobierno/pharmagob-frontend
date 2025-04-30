// third-party
import { combineReducers } from 'redux';
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import shipmentReducer from './slices/shipment';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    customer: customerReducer,
    shipment: shipmentReducer 
});

export default reducer;
