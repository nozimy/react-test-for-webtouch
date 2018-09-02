import React, { Component } from 'react';
import SearchInput from './../components/SearchInput'
// import './App.css';
import {Link} from 'react-router-dom';
import SearchComponent from './../components/SearchComponent';
import Grid from '@material-ui/core/Grid';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container justify="center" direction="column" alignItems="center" spacing={16}>
          <Grid item>
            
            <h1>Поиск forks репозитория на Github.com</h1>        
            {/* <Link to="/search?page=1&repo=facebook/react">to SearchResults</Link> */}
          
          </Grid>
          <Grid item>
            <SearchComponent />
          </Grid>
        </Grid>
      </div>
      
    );
  }
}

export default App;
