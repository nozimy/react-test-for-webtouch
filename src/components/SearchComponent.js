import React from 'react';
import SearchInput from './SearchInput';
import { withRouter } from 'react-router-dom';

const SearchComponent = withRouter((history) => (
    <SearchInput 
      onSearch={(value)=>{history.push(`/search?repo=${value}&page=1`)}}
    />
  ));

export default SearchComponent;