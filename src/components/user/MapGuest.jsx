import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import movedService from '../../service/movedService';
import trainicon from '../../img/trainicon.svg'
import train from '../../img/train1.svg'
import { db, dbstore } from '../Firebase/firebase'

const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

class MapGuest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      moved: [],
      isOpen: false,
      stations: [],
      trainStation: [
        { lat: 10.7823278, lng: 106.6750084, nameStation: 'Ga HCM' },
        { lat: 16.73796, lng: 107.1849024, nameStation: 'Ga QT' },
        { lat: 16.4566289, lng: 107.5760362, nameStation: 'Ga Hue' },
        { lat: 16.0716481, lng: 108.2071316, nameStation: 'Ga DN' },
        { lat: 20.8559782, lng: 106.6856289, nameStation: 'Ga HP' },
        { lat: 21.0242529, lng: 105.8388403, nameStation: 'Ga HN' }
      ]
    };
  }

  componentDidMount() {
    this.setTime = setInterval(() => {
      movedService.getMoved().then((response) => {
        this.setState({ moved: response.data });
      });
    }, 2000)
    db.ref('coordinates').once('value').then(snapshot => {
      this.setState({ stations: snapshot.val() })
    })

  }

  componentWillUnmount() {
    clearInterval(this.setTime);
  }
  componentDidUpdate() {
    var DestinationTime = JSON.parse(localStorage.getItem("DestinationTime"));
    var currentTime = new Date().getTime();
    console.log(currentTime + " " + DestinationTime)
    if (!!localStorage.getItem('TicketID') === true && DestinationTime !== null && (currentTime >= DestinationTime)) {
      dbstore.collection('Ticket').doc(localStorage.getItem("TicketID")).update({
        status: true
      }).then(() => {
        localStorage.removeItem('checked')
        localStorage.removeItem('TicketID')
        localStorage.removeItem('DestinationTime')
        localStorage.removeItem('IdTicket')
        localStorage.removeItem('status')
        this.props.history.push('/signin')
        return window.location.reload()
      })
    }
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
          url: trainicon,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      >
      </Marker>

    })
  }
  showInfoWindow = () => {
    return this.state.moved.map((store, index) => {
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
          scaledSize: new window.google.maps.Size(30, 30)
        }}
      >
      </Marker>
    })
  }

  back() {
    this.props.history.push("/enterticket");
  }

  render() {
    return (
      <>
      {/* <button onClick={this.back.bind(this)} className="btn btn-secondary">Back</button> */}
      {localStorage.getItem('IdTrain2') === "SE7" ?
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
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDrWJ3gyxq_hIPS1Y8DzcRRQ2qbqzQGfw'
})(MapGuest);