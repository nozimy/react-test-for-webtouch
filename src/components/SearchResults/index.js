import React from 'react';

class SearchResults extends React.Component {
    render(){
        return (
            <div>
                Таблица
                
                {this.props.items.map((item, i) => (
                    <li key={i}>{item.full_name}</li>
                    )
                )}
                
            </div>
        );
    }
}

export default SearchResults;