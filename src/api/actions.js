
import {createAction} from 'redux-actions';

import api from './index';

function* createGuidGenerator() {
    let i = 1;
    while (i) {
      yield i++;
    }
}
const guidGenerator = createGuidGenerator();

export const API_REQUEST_STARTED = 'API_REQUEST_STARTED';
export const apiRequestStarted = createAction(API_REQUEST_STARTED);
export const API_REQUEST_FINISHED = 'API_REQUEST_FINISHED';
export const apiRequestFinished = createAction(API_REQUEST_FINISHED);

export const API_REPOS_LOADED = 'API_REPOS_LOADED';
export const apiReposLoaded = createAction(API_REPOS_LOADED);

export function apiGetRepoList(query){
    return function tempDispatch(dispatch){
        const requestId = guidGenerator.next().value;
        dispatch(apiRequestStarted({requestId}));
        return api.getRepos(query)
            .then(data=>{
                dispatch(apiReposLoaded(data));
                dispatch(apiRequestFinished({requestId}));
            })
            .catch((error)=> {
				dispatch(apiRequestFinished({requestId, error}));
			});
    }
}