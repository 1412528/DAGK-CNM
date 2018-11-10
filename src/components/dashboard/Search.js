import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.filter = React.createRef();
    }
    
    componentDidMount() {
        this.props.fetchPeople();
    }
    
    handleChange = (e) => {
        this.props.searchPeople(this.filter.current.value);
    }
    
    render() {
        return (
            <div className="search">
                <input type="text" placeholder="search" ref={this.filter} onChange={this.handleChange}/>
                <i className="fa fa-search"></i>
            </div>
        )
    }
}

export default Search;