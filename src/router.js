import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './containers/App';
import SearchResultsContainer from './containers/SearchResultsContainer';

const router = ()=> {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" name="main" component={App} exact/>
                <Route path="/search" name="search" component={SearchResultsContainer} />
            </div>
        </BrowserRouter>
    )
}

export default router;