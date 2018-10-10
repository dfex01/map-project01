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
                id: uuid.v1(),
                description: 'home sweet home',
                lat: 33.83008972168741,
                lng: -84.35267661111448
            }
        ],
        editingMarker: false
    }

    onMarkerClick = (props, marker, e) => {
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
        if (this.state.showingInfoWindow) {
            this.setState({
              showingInfoWindow: false,
              activeMarker: null
            })  
        } else {
            const newMarker = {
                name: 'New Marker',
                id: uuid.v1(),
                description: 'This is a new marker :)',
                lat: click.latLng.lat(),
                lng: click.latLng.lng()
            };
            const nextMarkers = [...this.state.markers, newMarker];
            this.setState({markers: nextMarkers});
        }  
    }

    editMarkerHandler = () => {
        this.setState({ editingMarker: true });
    }

    finishEditHandler = () => {
        this.setState({ editingMarker: false });
    }

    editNameHandler = (e) => {
        let newPlace = {...this.state.selectedPlace};
        newPlace.name = e.target.value;
        this.state.markers.map(marker => {
            if (marker.id === this.state.selectedPlace.id){
                const index = this.state.markers.indexOf(marker);
                let newMarkers = [...this.state.markers]
                newMarkers[index].name = e.target.value;
                this.setState({ markers: newMarkers });
            } return null;
        });
        this.setState({ selectedPlace: newPlace });
    }

    editDescriptionHandler = (e) => {
        let newPlace = {...this.state.selectedPlace}
        newPlace.description = e.target.value;
        this.state.markers.map(marker => {
            if (marker.id=== this.state.selectedPlace.id){
                const index = this.state.markers.indexOf(marker);
                let newMarkers = [...this.state.markers]
                newMarkers[index].description = e.target.value;
                this.setState({ markers: newMarkers });
            } return null;
        });
        this.setState({ selectedPlace: newPlace });
    }

    removeMarkerHandler = () => {
        this.state.markers.map(marker => {
            if (marker.id === this.state.selectedPlace.id) {
                const index = this.state.markers.indexOf(marker);
                let newMarkers = [...this.state.markers];
                newMarkers.splice(index, 1);
                this.setState({ 
                    markers: newMarkers,
                    showingInfoWindow: false,
                    editingMarker: false });
            } return null;
        });
    }

    render() {

        const markers = this.state.markers.map(mrkr => {
            return (
                <Marker
                    id={mrkr.id}
                    key= {mrkr.id}
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
                    marker={this.state.activeMarker} 
                    editName={this.editNameHandler}
                    editDescription={this.editDescriptionHandler}
                    remove={this.removeMarkerHandler} />
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