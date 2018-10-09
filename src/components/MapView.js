import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import uuid from 'uuid';

class MapView extends Component {

    state = {
        markers: [
            { 
                name: 'start',
                lat: 33.83008972168741,
                lng: -84.35267661111448
            }
        ]
    }

    onMarkerClick = (e) => {
        console.log('[onMarkerClick]', e);
    }

    onMouseoverMarker = (e) => {
        console.log('[onMouseoverMarker]', e);
    }

    onMapClicked = (map, click) => {
        console.log('[onMapClicked]');
        const newMarker = {
            name: 'New Marker',
            lat: click.latLng.lat(),
            lng: click.latLng.lng()
        };
        const nextMarkers = [...this.state.markers, newMarker];
        this.setState({markers: nextMarkers});
    }


    render() {
        const markers = this.state.markers.map(mrkr => {
            return (
                <Marker
                    key= {uuid.v1()}
                    onClick={this.onMarkerClick}
                    onMouseover={this.onMouseoverMarker} 
                    name={mrkr.name}
                    position={{
                        lat: mrkr.lat,
                        lng: mrkr.lng 
                }}/>    
            );
        })



        return (
            <Map 
                google={this.props.google} 
                zoom={8}
                initialCenter={{
                    lat: 33.83008972168741,
                    lng: -84.35267661111448 
                }} 
                onClick={(t, map, c) => this.onMapClicked(map, c)}>
                {markers}
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCYHkj8sSYIxtHm_guGKtkxqJTRTPF4luE'
})(MapView)