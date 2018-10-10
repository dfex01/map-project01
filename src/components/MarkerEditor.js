import React, { Component } from 'react';
import '../assets/styles/markerEditor.css'

class MarkerEditor extends Component {

    render() {
        let content = (
            <div className="MarkerEditor modal">
                <div className="modal-content">

                    <h1>Marker Editor</h1>

                    <label>Name this location</label>
                    <input type="text" /><br />

                    <label>Tell your story about this location</label>
                    <input type="text" />

                </div>
            </div>
        );
        return (
            <div>
                {this.props.showMarkerEditor ? content : null} 
            </div>
        );
    }
} 

export default MarkerEditor;