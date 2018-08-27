import React, { Component } from 'react';
import SearchInput from './../components/SearchInput'
import './App.css';
import {Link} from 'react-router-dom';
import SearchComponent from './../components/SearchComponent';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Привет</h1>
        {/* <SearchInput 
          // onSearch={(value)=>alert(value)}
        /> */}
        <SearchComponent />

        {/* <Link to="/search?page=1&repo=facebook/react">to SearchResults</Link> */}
      </div>
    );
  }
}

export default App;
