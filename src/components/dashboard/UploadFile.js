import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.file = React.createRef();
    }
    
    handleChange = (e) => {        
        this.props.uploadFile(e.target.files[0]);
    }
    
    render() {

        return(
            <input type="file" ref={this.file} onChange={this.handleChange}/>
        )
    }
}

UploadFile.proptypes = {
    uploadFile: PropTypes.func.isRequired
}

export default UploadFile;