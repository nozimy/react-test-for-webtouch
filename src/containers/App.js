import React, { Component } from 'react';
import SearchInput from './../components/SearchInput'
import './App.css';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';

const Search = withRouter((history) => (
  <SearchInput 
    onSearch={(value)=>{history.push(`/search?repo=${value}&page=1`)}}
  />
));

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Привет</h1>
        {/* <SearchInput 
          // onSearch={(value)=>alert(value)}
        /> */}
        <Search />

        <Link to="/search?page=1&repo=facebook/react">to SearchResults</Link>
      </div>
    );
  }
}

export default App;
