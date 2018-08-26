import React from 'react';
import SearchResults from './../components/SearchResults';
import {connect} from 'react-redux';
import { apiGetRepoList } from './../api/actions'
import queryString from 'query-string';

class SearchResultsContainer extends React.Component{
    componentDidMount(){
        const parsed = queryString.parse(this.props.location.search);
        this.props.apiGetRepoList(parsed);
    }
    getRepos(){
        return this.props.repos || [];
    }
    render(){
        const {loading} = this.props;
        return (
            <div>
                {loading && 'Загрузка...'}
                <SearchResults items={this.getRepos()}/>
                <div>{this.props.location.search}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      loading: state.api.get('loading'),
      repos: state.api.getIn(['data', 'repos'])
    };
  }

const mapDispatchToProps = {
    apiGetRepoList
}

// export default SearchResultsContainer;
export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);
