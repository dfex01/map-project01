import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import uuid from 'uuid';
import firebase from './firebase';

import MarkerEditor from './MarkerEditor';
import Toolbar from './Toolbar';
import { mapStyle } from '../assets/mapStyle/mapStyle.js';
import '../assets/styles/infowindow.css';

class MapView extends Component {

    state = {
        activeMarker: null,
        showingInfoWindow: false,
        selectedPlace: {},
        user: {
            uid: 'null',
            name: 'Anonymous User',
            image: 'https://img1.looper.com/img/uploads/2017/06/dumb-and-dumber-780x438_rev1.jpg'
        },
        markers: [],
        friendMarkers: [],
        editingMarker: false,
        addingMarker: false,
        loadedFriends: false
    }

     
    componentDidMount() {

        firebase.auth().onAuthStateChanged(() => {
            let newUser = {...this.state.user};
            if (firebase.auth().currentUser) {
                newUser.uid = firebase.auth().currentUser.uid;
                newUser.name = firebase.auth().currentUser.displayName;
                newUser.image = firebase.auth().currentUser.photoURL;
                this.setState({ user: newUser });
            }    
        })
        
        firebase.database().ref('/users').once('value')
            .then(snapshot => {
                let updatedFriendMarkers = [...this.state.friendMarkers];
                for (let key in snapshot.val()) {
                    snapshot.val()[key].markers.map(marker => {
                        updatedFriendMarkers.push(marker);
                        return updatedFriendMarkers;
                    })
                }
                this.setState({ friendMarkers: updatedFriendMarkers });
        });  
    }
    

    onMarkerClick = (props, marker, e) => {
        this.setState({ 
            activeMarker: marker, 
            showingInfoWindow: true,
            selectedPlace: props 
        });
        const iwDiv = document.querySelector(".gm-style-iw");
        if (iwDiv) {
            iwDiv.previousSibling.children[3].setAttribute("id", "iw-outer-div");
            iwDiv.previousSibling.children[2].children[1].children[0].setAttribute("class", "iwBase")
            iwDiv.previousSibling.children[2].children[0].children[0].setAttribute("class", "iwBase")
        }
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
        } else if (this.state.addingMarker === false) {
             return null;
        } else {
            const newMarker = {
                name: 'New Marker',
                id: uuid.v1(),
                description: 'This is a new marker :)',
                lat: click.latLng.lat(),
                lng: click.latLng.lng(),
                userName: this.state.user.name,
                userPic: this.state.user.image
            };
            const nextMarkers = [...this.state.markers, newMarker];
            this.setState({markers: nextMarkers, addingMarker: false});
        }  
    }

    onInfoWindowClose = () => {
        this.setState({ 
            activeMarker: null,
            selectedPlace: {},
            showingInfoWindow: false });
    }

    editMarkerHandler = () => {
        if (!this.state.showingInfoWindow) return alert("You must select a marker to edit first");
        if (this.state.activeMarker == null) return null;
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
        if (!this.state.showingInfoWindow) return alert("You must select a marker to delete first");
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

    addMarkerMode = () => {
        this.setState({ addingMarker: true });
    }

    keyPressHandler = (e) => {
        if (e.charCode === 13) {
            this.finishEditHandler();
        }
    }

    saveMarkerHandler = () => {
        firebase.database().ref('users/' + this.state.user.uid).set({
            id: this.state.user.uid,
            name: this.state.user.name,
            picture: this.state.user.image,
            markers: this.state.markers
        });
    }

    render() {  
        
        const markers = this.state.markers.map(mrkr => {
            return (
                <Marker
                    //icon={{fillColor: '#fffff'}}
                    user={mrkr.userName}
                    pic={mrkr.userPic}
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

        const friendMarkers = this.state.friendMarkers.map(mrkr => {
            return (
                <Marker
                    //icon={{fillColor: '#fffff'}}
                    user={mrkr.userName}
                    pic={mrkr.userPic}
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
                <Toolbar 
                    editMarker={this.editMarkerHandler}
                    addMarker={this.addMarkerMode}
                    removeMarker={this.removeMarkerHandler} 
                    saveMarker={this.saveMarkerHandler} />
                <MarkerEditor
                    showMarkerEditor={this.state.editingMarker} 
                    close={this.finishEditHandler}
                    place={this.state.selectedPlace} 
                    marker={this.state.activeMarker} 
                    editName={this.editNameHandler}
                    editDescription={this.editDescriptionHandler}
                    remove={this.removeMarkerHandler}
                    keyPress={this.keyPressHandler} />
                <Map
                    styles={mapStyle} 
                    google={this.props.google} 
                    zoom={8}
                    initialCenter={{
                        lat: 33.83008972168741,
                        lng: -84.35267661111448 
                    }} 
                    onClick={(t, map, c) => this.onMapClicked(map, c)}>
                    {markers}
                    {friendMarkers}
                        <InfoWindow
                        onClose={this.onInfoWindowClose}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div className="iw-content">
                                <h1>{this.state.selectedPlace.name}</h1>
                                <div className="iw-inner-content">
                                    <div className="user-info">
                                        <img className="iw-img" src={this.state.selectedPlace.pic} alt ={this.state.selectedPlace.use}/>
                                        <p>{this.state.selectedPlace.user}</p>
                                    </div>
                                    <div className="iw-details">
                                        <p style={{fontWeight: "bold"}}>Story</p>
                                        <p>{this.state.selectedPlace.description}</p>
                                    </div>
                                </div>
                            </div>
                        </InfoWindow>
                </Map>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    //apiKey: 'AIzaSyCYHkj8sSYIxtHm_guGKtkxqJTRTPF4luE'
})(MapView)