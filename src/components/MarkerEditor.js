import React, { Component } from 'react';

import '../assets/styles/markerEditor.css'
import MrkrEditBackdrop from './MrkrEditBackdrop';

class MarkerEditor extends Component {

    render() {
        let content = (
                <div className="Modal">

                    <h1>Marker Editor</h1>

                    <label>Name this location</label>
                    <textarea 
                        type="text" 
                        value={this.props.place.name} 
                        onChange={(e) => this.props.editName(e)}
                        onKeyPress={(e) => this.props.keyPress(e)} /><br />

                    <label>Tell your story about this location</label>
                    <textarea
                        className="storyInput" 
                        type="text" 
                        value={this.props.place.description} 
                        onChange={(e) => this.props.editDescription(e)} 
                        onKeyPress={(e) => this.props.keyPress(e)}/><br />

                    <button onClick={this.props.remove}>Remove this Marker</button>
                    <button onClick={this.props.close}>Submit</button>
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