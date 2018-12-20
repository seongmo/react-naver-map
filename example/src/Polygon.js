import React, {Component} from 'react'
import NaverMap, {Polygon} from 'react-naver-map'
import './style.css'

const clientId = process.env.REACT_APP_CLIENT_ID

class App extends Component {
  render() {
    return (
      <div>
        <h1>Polygon</h1>

        <NaverMap
          clientId={clientId}
          style={{width: '500px', height: '500px'}}
          initialPosition={{lat: 36.0248521, lng: 129.3578551}}
          initialZoom={9}>
          <Polygon
            paths={[
              [
                {lat: 36.0208521, lng: 129.3578551},
                {lat: 36.0408521, lng: 129.3678551},
                {lat: 36.0238521, lng: 129.3378551},
              ],
              [
                {lat: 36.0108521, lng: 129.3478551},
                {lat: 36.0308521, lng: 129.3578551},
                {lat: 36.0138521, lng: 129.3678551},
              ],
            ]}
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
