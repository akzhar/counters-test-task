import {combineReducers} from 'redux';

import reducerCounters, { TCountersState } from '@store/reducer-counters';

export type TState = {
  counters: TCountersState
};

const reducer = combineReducers({
  counters: reducerCounters
});

export default reducer;
