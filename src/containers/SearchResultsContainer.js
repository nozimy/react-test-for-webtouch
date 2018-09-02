import React from 'react';
import SearchResults from './../components/SearchResults';
import SearchComponent from './../components/SearchComponent';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { apiGetRepoList, setSearchQuery} from './../api/actions'
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CircularProgress from '@material-ui/core/CircularProgress';


const loadingStyles = {
    position: 'fixed',
    right: 5,
    top: 5
}

const gridStyle = {
    opacity: '.4',
}

class SearchResultsContainer extends React.Component{
    componentDidMount(){
        this.request();
    }
    componentDidUpdate (){
        if(this.props.searchQuery != this.props.location.search){
            this.request();
        }
    }
    request(){
        this.props.setSearchQuery(this.props.location.search);
        const parsed = queryString.parse(this.props.location.search);
        this.props.apiGetRepoList(parsed);
    }
    getRepos(){
        return this.props.repos || [];
    }
    render(){
        const {loading, error, pagination} = this.props;
        const parsed = queryString.parse(this.props.location.search);
        
        return (
            <Grid container justify="center" direction="column" alignItems="center" spacing={16}>
                <Grid item>
                    <SearchComponent />
                </Grid>

                <Grid item style={loading ? gridStyle : {}}>
                    {loading && <CircularProgress style={loadingStyles} size={30}/>}
                    {error || this.props.repos == null ? 
                        error 
                        : 
                        <SearchResults 
                            items={this.getRepos()}
                        >
                        </SearchResults>
                    }
                    
                </Grid>
            
                <Grid item>
                    {/* <div>{this.props.location.search}</div> */}
                    {
                        pagination.get('first') != null &&
                        <IconButton
                            component={Link} 
                            to={`/search?repo=${parsed.repo}&page=1`}
                            aria-label="First Page"
                        >
                            <FirstPageIcon />
                        </IconButton>
                    }
                    {
                        pagination.get('prev') != null &&
                        <IconButton
                            component={Link} 
                            to={`/search?repo=${parsed.repo}&page=${pagination.get('prev').match(/page=(\d+).*$/)[1]}`}
                            aria-label="Prev Page"
                        >
                            {/* {pagination.get('prev').match(/page=(\d+).*$/)[1]} */}
                            <KeyboardArrowLeft />
                        </IconButton>
                    }
                    {
                        pagination.get('next') != null &&
                        <IconButton
                            component={Link} 
                            to={`/search?repo=${parsed.repo}&page=${pagination.get('next').match(/page=(\d+).*$/)[1]}`}
                            aria-label="Next Page"
                        >
                            {/* {pagination.get('next').match(/page=(\d+).*$/)[1]} */}
                            <KeyboardArrowRight />
                        </IconButton>
                    }
                    {
                        pagination.get('last') != null &&
                        <IconButton
                            component={Link} 
                            to={`/search?repo=${parsed.repo}&page=${pagination.get('last').match(/page=(\d+).*$/)[1]}`}
                            aria-label="Last Page"
                        >
                            <LastPageIcon />
                        </IconButton>
                    }
                    
                    {/* <div> */}
                        {/* {pagination.get('first') != null ? <Link to={`/search?repo=${parsed.repo}&page=1`}>{'<<'}</Link> : null} */}
                        {/* {pagination.get('prev') != null ? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('prev').match(/page=(\d+).*$/)[1]}`}>{pagination.get('prev').match(/page=(\d+).*$/)[1]}</Link> : null} */}
                        {/* {parsed.page} */}
                        {/* {pagination.get('next') != null? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('next').match(/page=(\d+).*$/)[1]}`}>{pagination.get('next').match(/page=(\d+).*$/)[1]}</Link> : null}
                        {pagination.get('last') != null ? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('last').match(/page=(\d+).*$/)[1]}`}>{'>>'}</Link> : null} */}
                    {/* </div> */}
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
      loading: state.api.get('loading'),
      error: state.api.getIn(['errors', 'last']),
      repos: state.api.getIn(['data', 'repos', 'data']),
      pagination: state.api.getIn(['data', 'repos', 'rels']),
      searchQuery: state.api.get('searchQuery')
    };
  }

const mapDispatchToProps = {
    apiGetRepoList,
    setSearchQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);
