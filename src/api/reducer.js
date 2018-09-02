import { Map, OrderedMap, List} from 'immutable';

import {API_REQUEST_FINISHED, API_REQUEST_STARTED,
	API_REPOS_LOADED, SET_SEARCH_QUERY} from './actions';

const initialState  = Map({
	loading: false,
	requests: OrderedMap({}),
	errors: Map({
		last: null
	}),
	data: Map({
		repos: Map({
			data: null,
			rels: Map({}) //pagination
		})
	}),
	searchQuery: ''
});

export default function ApiReducer(state = initialState, action){
    switch(action.type){
        case API_REQUEST_STARTED:
			return state
				.setIn(['requests', action.payload.requestId], action.payload)
				.set('loading', true);

		case API_REQUEST_FINISHED:
			return state
				.removeIn(['requests', action.payload.requestId])
				.set('loading', (state.get('requests').size > 1))
				.setIn(
					['errors', 'last'],
					(action.payload.error ? action.payload.error.message : state.getIn(['errors', 'last']))
				);
		case API_REPOS_LOADED:
			return state
				.setIn(['data', 'repos', 'data'], List(action.payload.json))
				.setIn(['data', 'repos', 'rels'], Map(action.payload.rels));
		case SET_SEARCH_QUERY:
			return state
				.set('searchQuery', action.payload);
        
        default:
            return state;
    }
}