// third-party
import { combineReducers } from 'redux';
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    customer: customerReducer
});

export default reducer;
