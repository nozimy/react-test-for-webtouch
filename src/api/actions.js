
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
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const setSearchQuery = createAction(SET_SEARCH_QUERY);


export function apiGetRepoList(query){
    return function tempDispatch(dispatch){
        const requestId = guidGenerator.next().value;
        dispatch(apiRequestStarted({requestId}));
        return api.getRepos(query)
            .then(data=>{
                let linksRegex = /https\S*\d/gm;
                let relsRegex = /"(\S*)"/gm;
                let links = data.headers.link.match(linksRegex);
                let rels = data.headers.link.match(relsRegex);
                data.rels = {};
                rels.forEach((r, i) => {
                    data.rels[r.replace(/['"]+/g, '')] = links[i];
                });
                dispatch(apiReposLoaded(data));
                dispatch(apiRequestFinished({requestId}));
            })
            .catch((error)=> {
				dispatch(apiRequestFinished({requestId, error}));
			});
    }
}