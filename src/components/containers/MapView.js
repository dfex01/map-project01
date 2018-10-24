import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import uuid from 'uuid';
import firebase from '../firebase';
import { withAlert } from 'react-alert'

import MarkerEditor from '../MarkerEditor';
import UserTools from '../Users/UserTools';
import Toolbar from '../Toolbar/Toolbar';
import { mapStyle } from '../../assets/mapStyle/mapStyle.js';
import '../../assets/styles/mapview.css';
import lightMarker from '../../assets/images/light-marker.svg';
import darkMarker from '../../assets/images/dark-marker.svg';

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
        alert: false,
        showingToolbar: false,
        showingUsers: false
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
            firebase.database().ref('/users').once('value')
            .then(snapshot => {
                let updatedFriendMarkers = [...this.state.friendMarkers];
                let updatedMarkers = [...this.state.markers]
                for (let key in snapshot.val()) {
                    if (key === this.state.user.uid) {
                        snapshot.val()[key].markers.map(marker => {
                            updatedMarkers.push(marker);
                            return updatedMarkers;
                        }) 
                    } else {
                        snapshot.val()[key].markers.map(marker => {
                            updatedFriendMarkers.push(marker);
                            return updatedFriendMarkers;
                        })
                    }
                }
                this.setState({ markers: updatedMarkers, friendMarkers: updatedFriendMarkers });
        });  
        })
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
        if (!this.state.showingInfoWindow) return this.giveAlert("You must select a marker to edit first");
        if (this.state.activeMarker == null) return null;
        if (!this.state.activeMarker.editable) return this.giveAlert("You can't edit your friend's markers");         
        this.setState({ editingMarker: !this.state.editingMarker });
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
        if (!this.state.showingInfoWindow) return this.giveAlert("You must select a marker to delete first");
        
        if (!this.state.activeMarker.editable) return this.giveAlert('You cannot remove your friends markers!');
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
        if (this.state.user.name === 'Anonymous User') return this.giveAlert('Anonymous users cannot save markers. Log in if you would like to save.')
        firebase.database().ref('users/' + this.state.user.uid).set({
            id: this.state.user.uid,
            name: this.state.user.name,
            picture: this.state.user.image,
            markers: this.state.markers
        });
    }

    toggleToolbarHandler = () => {
        this.setState({ showingToolbar: !this.state.showingToolbar });
    }

    toggleUsersHandler = () => {
        this.setState({ showingUsers: !this.state.showingUsers });
    }

    giveAlert = (text) => {
        if (!this.state.alert) {
            this.setState({ alert: true });
            this.props.alert.show(
                (text),
                {
                    onOpen: () => {
                        if (document.getElementById('root').parentNode.children[6].children[0]) {
                            document.getElementById('root').parentNode.children[6].children[0].children[0].children[0].children[0].setAttribute('id', 'alertBoxContainer');
                            document.getElementById('root').parentNode.children[6].children[0].children[0].children[0].children[0].children[0].setAttribute('id', 'alertBoxSVG');
                        } else {
                            document.getElementById('root').parentNode.children[5].children[0].children[0].children[0].children[0].setAttribute('id', 'alertBoxContainer');
                            document.getElementById('root').parentNode.children[5].children[0].children[0].children[0].children[0].children[0].setAttribute('id', 'alertBoxSVG');
                        }
                        },
                    timeout: 2500,
                    type: 'success',
                    onClose: () => {this.setState({ alert: false })}
                }
            );
        
        }
    }

    render() {  
        const markers = this.state.markers.map(mrkr => {
            return (
                <Marker
                    icon={darkMarker}
                    title={'You @ ' + mrkr.name}
                    editable={true}
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
                    icon={lightMarker}
                    title={mrkr.userName + ' @ ' + mrkr.name}
                    editable={false}
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
                    show={this.state.showingToolbar}
                    toggle={this.toggleToolbarHandler}
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
                <UserTools 
                    toggle={this.toggleUsersHandler}
                    show={this.state.showingUsers} />
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
    //apiKey: <API KEY GOES HERE>
})(withAlert(MapView))