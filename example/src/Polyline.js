import React, {Component} from 'react'
import NaverMap, {Polyline} from 'react-naver-map'
import './style.css'

const clientId = process.env.REACT_APP_CLIENT_ID

class App extends Component {
  state = {
    path: [
      {lat: 36.0208521, lng: 129.3578551},
      {lat: 36.0408521, lng: 129.3678551},
      {lat: 36.0238521, lng: 129.3378551},
    ],
  }

  handleMapClick = e => {
    const lat = e.latlng.lat()
    const lng = e.latlng.lng()
    this.setState(state => ({path: [...state.path, {lat, lng}]}))
  }

  render() {
    const {path} = this.state

    return (
      <div>
        <h1>Polyline</h1>

        <NaverMap
          ncp
          clientId={clientId}
          style={{width: '500px', height: '500px'}}
          initialPosition={{lat: 36.0208521, lng: 129.3578551}}
          initialZoom={8}
          onMapClick={this.handleMapClick}>
          <Polyline
            path={path}
            fillColor={'#f0ff0f'}
            fillOpacity={0.5}
            strokeColor={'#f04da8'}
            strokeOpacity={0.9}
            strokeWeight={3}
          />
        </NaverMap>
      </div>
    )
  }
}

export default App
