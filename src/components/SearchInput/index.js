import React from 'react';

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
        return (
            <div>
                <form action="/search"
                    // onSubmit={this.handleSubmit}
                    >
                    <input type="text" 
                        name="repo" 
                        placeholder="For example user/repoName" 
                        value={this.state.value} 
                        onChange={this.handleChange}/>
                    {/* <button type="submit" 
                        value="Submit" 
                        onClick={()=>this.props.onSearch(this.state.value)}
                        >Найти</button> */}
                    <input type="submit" value="Найти" />
                </form>
            </div>
        );
    }
}

export default SearchInput;