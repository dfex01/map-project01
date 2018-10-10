import React, { Component } from 'react';

import '../assets/styles/markerEditor.css'
import MrkrEditBackdrop from './MrkrEditBackdrop';

class MarkerEditor extends Component {

    render() {
        let content = (
                <div className="Modal">

                    <h1>Marker Editor</h1>

                    <label>Name this location</label>
                    <input type="text" value={this.props.place.name} onChange={(e) => this.props.editName(e)} /><br />

                    <label>Tell your story about this location</label>
                    <input type="text" value={this.props.place.description} onChange={(e) => this.props.editDescription(e)} /><br />

                    <button onClick={this.props.remove}>Remove this Marker</button>
                    <input type="submit" onClick={this.props.close} />
                </div>
        );

        // console.log(this.props);
        // console.log(this.props.marker);
        // console.log(this.props.place.name);


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