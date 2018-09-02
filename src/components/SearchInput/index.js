import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
  });

class SearchInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: ""};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        if(this.props.onSearch){
            this.props.onSearch(this.state.value);
        }
        // alert('repo: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <form action="/search"
                    >
                    <TextField 
                        className={classes.textField}
                        name="repo"
                        label="Название репозитория"
                        placeholder="Например: facebook/react"
                        value={this.state.value}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Найти forks
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(SearchInput);
