import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapView extends Component {

    onMarkerClick = (e) => {
        console.log('[onMarkerClick]', e);
    }

    onMouseoverMarker = (e) => {
        console.log('[onMouseoverMarker]', e);
    }

    onMapClicked = (map, click) => {
        console.log('[onMapClicked]');
        const latitude = click.latLng.lat();
        const longitude = click.latLng.lng();
        console.log(latitude, longitude);
    }


    render() {
        console.log(this.props);
        return (
            <Map 
                google={this.props.google} 
                zoom={8}
                initialCenter={{
                    lat: 33.83008972168741,
                    lng: -84.35267661111448 
                }} 
                onClick={(t, map, c) => this.onMapClicked(map, c)}>
                <Marker 
                    onClick={this.onMarkerClick}
                    onMouseover={this.onMouseoverMarker} 
                    name={'current location'} 
                    position={{
                        lat: 33.83008972168741,
                        lng: -84.35267661111448 
                    }}/>
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