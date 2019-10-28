import React, { Component } from 'react';
import Search from './components/searchbar';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const mapStyles = {
  width: '100%',
  height: '100%',
};

class App extends React.Component {
 constructor(props) {
  super(props); 

  this.state = {
    chargers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
      }       
}

callAPI() {
  fetch("http://localhost:5000/chargers")
      .then(res => res.json())
      .then(response => this.setState({ chargers: response}) );
}

componentWillMount() {
  this.callAPI();
}

onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

onClose = props => {
    if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
         });
       }
    };

displayMarkers = () => {
  return (this.state.chargers.map((chargers, index) => {
    return  <React.Fragment> 
              <Marker key={index} id={index} position={{
                    lat: chargers.latitude,
                    lng: chargers.longitude }}
                  onClick={this.onMarkerClick} />
              <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose} >
                      <div>
                        <h2>{this.state.chargers.chargerID}</h2>
                          <p>City: {this.state.chargers.city}</p>
                          <p>Type: {this.state.chargers.type}</p>
                          <p>Connector type: {this.state.chargers.connector}</p>
                          <p>Price: {this.state.chargers.price}</p>
                          <p>Power: {this.state.chargers.power}</p>
                      </div>
              </InfoWindow>
          </React.Fragment>
      })
    )
  }

render(){


  return (
    <div className="App">
      <header><Search /></header>
      <Map
          google={this.props.google}
          zoom={5}
          style={mapStyles}
          initialCenter={{ lat: 65.0121, lng: 25.4651}} >

           {this.displayMarkers()}

        </Map>
     </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYoFrNs2ngQnp6y4Ux7NrMDARpjPE59l8'
})(App);
