import React, { Component } from 'react';

import '../assets/styles/markerEditor.css'
import MrkrEditBackdrop from './MrkrEditBackdrop';

class MarkerEditor extends Component {

    render() {
        let content = (
                <div className="Modal">

                    <h1>Marker Editor</h1>

                    <label>Name this location</label>
                    <input type="text" /><br />

                    <label>Tell your story about this location</label>
                    <input type="text" /><br />

                    <input type="submit" onClick={this.props.close} />
                </div>
        );

        console.log(this.props);
        console.log(this.props.marker);
        console.log(this.props.place.name);


        return (
            <div>
                <MrkrEditBackdrop 
                    show={this.props.showMarkerEditor}
                    clicked={this.props.close} />
                {this.props.showMarkerEditor ? content : null} 
            </div>
        );
    }
} 

export default MarkerEditor;