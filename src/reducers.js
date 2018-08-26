import {combineReducers} from 'redux';
import ApiReducer from './api/reducer';

export default combineReducers({
    api: ApiReducer
});