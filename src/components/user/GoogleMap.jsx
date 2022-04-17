import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import movedService from '../../service/movedService';
import trainLocal from '../../img/location.svg';
import train from '../../img/train1.svg'
import { db, dbstore } from './../Firebase/firebase'
import { CountDownTime } from './CountDownTime/CountDownTime';
import TicketCode from './Ticket/TicketCode';
const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      moved: [],
      moved2: [],
      isOpen: false,
      stations: [],
      trainStation: [],
      showInfoIndex: 0
    };

  }

  componentDidMount() {
    this.setTime = setInterval(() => {
      movedService.getMoved().then((response) => {
        this.setState({ moved: response.data });
      });
      movedService.getMoved2().then((response) => {
        this.setState({ moved2: response.data });
      });
    }, 2000)
    db.ref('coordinates').once('value').then(snapshot => {
      this.setState({ stations: snapshot.val() })
    })
    const fdata = [];
    dbstore.collection('Station').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          fdata.push({
            lat: change.doc.data().LatStation,
            lng: change.doc.data().LngStation,
            nameStation: change.doc.data().NameStation
          })
        }
        this.setState({
          trainStation: fdata
        })
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.setTime);
  }

  onToggleOpen = () => {
    console.log("clicked")
    this.setState({
      isOpen: true
    });
  }
  onToggleClose = () => {
    console.log("clicked")
    this.setState({
      isOpen: false
    });
  }
  showMarkers = () => {
    return this.state.moved.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }}
        label={{
          color: 'black',
          fontWeight: 'bold',
          text: store.ranges,
        }}
        onClick={this.onToggleOpen}
        icon={{
          labelOrigin: new window.google.maps.Point(10, 35),
          url: trainLocal,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      >
      </Marker>
    })
  }
  showInfoWindow = () => {
    return this.state.moved.map((store, index) => {
      console.log(store.lat)

      return <InfoWindow
        key={index} id={index}
        pixelOffset={new window.google.maps.Size(0, -25)}
        position={{ lat: store.lat, lng: store.lng }}
        onClose={this.onToggleClose}
        visible={this.state.isOpen}
      >
        <div>
          <h4>{store.region}</h4>
          <span>{store.description}</span>
        </div>
      </InfoWindow>
    })
  }

  showMarkers2 = () => {
    return this.state.moved2.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }}
        label={{
          color: 'black',
          fontWeight: 'bold',
          text: store.ranges,
        }}
        onClick={this.onToggleOpen}
        icon={{
          labelOrigin: new window.google.maps.Point(10, 35),
          url: trainLocal,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      >
      </Marker>
    })
  }
  showInfoWindow2 = () => {
    return this.state.moved2.map((store, index) => {
      return <InfoWindow
        key={index} id={index}
        pixelOffset={new window.google.maps.Size(0, -25)}
        position={{ lat: store.lat, lng: store.lng }}
        onClose={this.onToggleClose}
        visible={this.state.isOpen}
      >
        <div>
          <h4>asd</h4>
        </div>
      </InfoWindow>
    })
  }


  showPolyline = () => {
    const symbolOne = {
      path: "M -2,0 0,-2 2,0 0,2 z",
      strokeColor: "#F00",
      fillColor: "#F00",
      fillOpacity: 1,
    };

    return <Polyline
      path={this.state.stations}
      geodesic={true}
      options={{
        strokeColor: "#ff2527",
        strokeOpacity: 0.75,
        strokeWeight: 2,
        icons: [
          {
            icon: symbolOne,
            offset: "0%",
          },
          {
            icon: symbolOne,
            offset: "29%",
          },
          {
            icon: symbolOne,
            offset: "100%",
          }]
      }}

    />
  }
  showTrainStation = () => {
    return this.state.trainStation.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }}
        label={{
          color: '#5DADE2',
          fontWeight: 'bold',
          text: store.nameStation,
        }}
        icon={{
          labelOrigin: new window.google.maps.Point(15, -5),
          url: train,
          scaledSize: new window.google.maps.Size(33, 33)
        }}
      >
      </Marker>
    })
  }
  render() {
    return (

      <div className="row">

        {localStorage.getItem('IdTicket') === null ?
          <>
            <div className="col-xl-12" style={{ "height": "auto", "width": "670px", "margin": "auto" }}>
              <div className="alert alert-custom alert-white alert-shadow fade show gutter-b mx-auto" role="alert">
                <TicketCode />
              </div>
              <div className="card card-custom gutter-b card-stretch">
                <img src="./assets/images/waiting.png" alt="IMG" style={{ "background-repeat": "no-repeat", "background-size": "100% 100%" }}></img>
              </div>
            </div>
          </>
          : localStorage.getItem('IdTrain') === "SE7" ?
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{
                lat: 16.047079,
                lng: 108.206230
              }}>
              {this.showPolyline()}
              {this.showMarkers()}
              {this.showInfoWindow()}
              {this.showTrainStation()}
            </Map>
            :
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{
                lat: 16.047079,
                lng: 108.206230
              }}>
              {this.showPolyline()}
              {this.showMarkers2()}
              {this.showInfoWindow2()}
              {this.showTrainStation()}
            </Map>
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDrWJ3gyxq_hIPS1Y8DzcRRQ2qbqzQGfw'
})(MapContainer);