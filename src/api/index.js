import axios from 'axios';
import constants from './../constants'

const defaultParams = {
    mode: 'none',
	cache: "no-cache"
};
let apiUrl = constants.github_api_url;

function ApiError(url, message, statusCode) {
    this.url = url;
    this.message = message;
    this.statusCode = statusCode || '';
    this.title = 'API Error';
    this.stack = (new Error()).stack;
  }

function throwApiError(url, error, statusCode) {
    throw new ApiError(url, error, statusCode);
}

export function _request(params) {
	let requestUrl;
	let requestParams;
	if (typeof params === 'string') {
		requestUrl = params;
		requestParams = {};
	} else {
		const {url, ...restParams} = params;
		requestUrl = url;
		requestParams = restParams;
	}
	requestParams.withCredentials = false;

	return axios({
		url:`${apiUrl}${requestUrl}`,
		...defaultParams, ...requestParams
	})
		.then((response) => {

			let json = response.data;
			let headers = response.headers;

			if (json && json.error) {
				return throwApiError(requestUrl, json.error, response.status);
			}
			return {json, headers};
		})
		.catch((error) => {
			if (error.response && error.response.status) {
				throwApiError(requestUrl, error.message, error.response.status)
			} else {
				return Promise.reject(error);
			}
		})
}

function getRepos(payload){
    return _request(`/repos/${payload.repo}/forks?page=${payload.page}`);
}

export default {
    getRepos
}

