import React from 'react'
import NaverMap, {Marker} from 'react-naver-map'
import markerPng from './marker_v2.png'
import './style.css'

const clientId = process.env.REACT_APP_CLIENT_ID

const CustomMarker = ({lat, lng, onClick}) => (
  <Marker
    lat={lat}
    lng={lng}
    onClick={onClick}
    icon={{
      url: markerPng,
      size: {width: 24, height: 32},
      scaledSize: {width: 24, height: 32},
      anchor: {x: 12, y: 32},
    }}
    shape={{coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12], type: 'poly'}}
  />
)

class App extends React.Component {
  state = {
    markers: [{id: 1, lat: 36.0208521, lng: 129.3578551}],
  }

  handleMapClick = e => {
    const lat = e.latlng.lat()
    const lng = e.latlng.lng()
    this.setState(state => ({markers: [...state.markers, {id: +new Date(), lat, lng}]}))
  }

  handleMarkerClick = (id, e) => {
    this.setState(state => ({markers: state.markers.filter(m => m.id !== id)}))
  }

  changeMarkers = () => {
    const newMarkers = this.state.markers.map(m => ({...m, lat: m.lat + 0.005}))
    this.setState({markers: newMarkers})
  }

  render() {
    const {markers} = this.state
    const firstMarker = markers[0]

    return (
      <div>
        <h1>Marker</h1>
        <button onClick={this.changeMarkers}>Change Markers</button>
        <NaverMap
          ncp
          clientId={clientId}
          style={{width: '500px', height: '500px'}}
          initialPosition={firstMarker}
          initialZoom={8}
          onMapClick={this.handleMapClick}>
          {markers.map(marker => (
            <CustomMarker
              key={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              onClick={e => this.handleMarkerClick(marker.id, e)}
            />
          ))}
          <Marker lat={36.0218521} lng={129.3678551} />
        </NaverMap>
      </div>
    )
  }
}

export default App
