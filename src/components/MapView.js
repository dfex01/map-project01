import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import uuid from 'uuid';

import MarkerEditor from './MarkerEditor';
import Toolbar from './Toolbar';

class MapView extends Component {

    state = {
        activeMarker: {},
        showingInfoWindow: false,
        selectedPlace: {},
        markers: [
            { 
                name: 'start',
                description: 'home sweet home',
                lat: 33.83008972168741,
                lng: -84.35267661111448
            }
        ],
        editingMarker: false
    }

    onMarkerClick = (props, marker, e) => {
        console.log('[onMarkerClick]');
        console.log(props);
        this.setState({ 
            activeMarker: marker, 
            showingInfoWindow: true,
            selectedPlace: props 
        });
    }

    onMouseoverMarker = (e) => {
       // console.log('[onMouseoverMarker]', e);
    }

    onMapClicked = (map, click) => {
        console.log('[onMapClicked]');
        if (this.state.showingInfoWindow) {
            this.setState({
              showingInfoWindow: false,
              activeMarker: null
            })  
        } else {
            const newMarker = {
                name: 'New Marker',
                description: 'This is a new marker :)',
                lat: click.latLng.lat(),
                lng: click.latLng.lng()
            };
            const nextMarkers = [...this.state.markers, newMarker];
            this.setState({markers: nextMarkers});
        }  
    }

    editMarkerHandler = () => {
        console.log('click');
        this.setState({ editingMarker: true });
    }

    finishEditHandler = () => {
        this.setState({ editingMarker: false });
    }


    render() {
        const markers = this.state.markers.map(mrkr => {
            return (
                <Marker
                    key= {uuid.v1()}
                    onClick={this.onMarkerClick}
                    onMouseover={this.onMouseoverMarker} 
                    name={mrkr.name}
                    description={mrkr.description}
                    position={{
                        lat: mrkr.lat,
                        lng: mrkr.lng 
                }}/>    
            );
        })


        return (
            <div>
                <Toolbar click={this.editMarkerHandler} />
                <MarkerEditor 
                    showMarkerEditor={this.state.editingMarker} 
                    close={this.finishEditHandler}
                    place={this.state.selectedPlace} 
                    marker={this.state.activeMarker} />
                <Map 
                    google={this.props.google} 
                    zoom={8}
                    initialCenter={{
                        lat: 33.83008972168741,
                        lng: -84.35267661111448 
                    }} 
                    onClick={(t, map, c) => this.onMapClicked(map, c)}>
                    {markers}
                    <InfoWindow
                    onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <p>{this.state.selectedPlace.description}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCYHkj8sSYIxtHm_guGKtkxqJTRTPF4luE'
})(MapView)