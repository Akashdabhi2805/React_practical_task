import { createStore, combineReducers } from 'redux';
import cardReducer from './reducers';

const rootReducer = combineReducers({
  cards: cardReducer
});

const store = createStore(rootReducer);

export default store;
