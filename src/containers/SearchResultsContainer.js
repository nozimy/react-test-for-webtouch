import React from 'react';
import SearchResults from './../components/SearchResults';
import SearchComponent from './../components/SearchComponent';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { apiGetRepoList, setSearchQuery} from './../api/actions'
import queryString from 'query-string';

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
        const {loading} = this.props;
        const {pagination} = this.props;
        const parsed = queryString.parse(this.props.location.search);
        
        return (
            <div>
                <SearchComponent />
                {loading && 'Загрузка...'}
                <SearchResults items={this.getRepos()}/>
                <div>{this.props.location.search}</div>
                <div>
                    {pagination.get('first') != null ? <Link to={`/search?repo=${parsed.repo}&page=1`}>{'<<'}</Link> : null}
                    {pagination.get('prev') != null ? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('prev').match(/page=(\d+).*$/)[1]}`}>{pagination.get('prev').match(/page=(\d+).*$/)[1]}</Link> : null}
                    {parsed.page}
                    {pagination.get('next') != null? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('next').match(/page=(\d+).*$/)[1]}`}>{pagination.get('next').match(/page=(\d+).*$/)[1]}</Link> : null}
                    {pagination.get('last') != null ? <Link to={`/search?repo=${parsed.repo}&page=${pagination.get('last').match(/page=(\d+).*$/)[1]}`}>{'>>'}</Link> : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      loading: state.api.get('loading'),
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
