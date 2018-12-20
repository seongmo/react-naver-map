import React, {Component} from 'react'
// import {render} from 'react-dom'
// import markerSvg from './marker.svg'
import markerPng from './marker.png'
import markerPng2 from './marker_v2.png'
import kongImg from './kong.jpg'
import './style.css'

import NaverMap, {Marker, Overlay, Polygon, Polyline} from 'react-naver-map'

const MyMarker = props => (
  <svg width={48} height={64} onMouseOver={() => console.log('MyMarker Mouse Over!!')}>
    <path
      fill="#4daadc"
      stroke="black"
      strokeWidth="1"
      d="M48.02,22.168c0.011,0.141,0.011,0.272,0.011,0.413c0,8.014-4.675,13.478-10.141,19.038C33.369,46.217,27,64,24.08,64c-3.08,0-9.29-17.783-13.81-22.381C4.804,36.06,0.13,30.595,0.13,22.582c0-0.141,0-0.272,0.01-0.413l-0.01-0.01l0.01-0.01C0.38,9.917,11,0.06,24.08,0.06s23.7,9.856,23.939,22.088l0.011,0.01L48.02,22.168z"
    />
    <text x="20" y="32" fill="red">
      {props.num}
    </text>
  </svg>
)

const CustomMarker = ({lat, lng, onClick}) => (
  <Marker
    lat={lat}
    lng={lng}
    onClick={onClick}
    icon={{
      url: markerPng2,
      size: {width: 24, height: 32},
      scaledSize: {width: 24, height: 32},
      anchor: {x: 12, y: 32},
    }}
    shape={{coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12], type: 'poly'}}
  />
)

class App extends Component {
  state = {
    bounds: undefined,
    markers: [
      {id: 0, lat: 36.0208521, lng: 129.3578551},
      {id: 1, lat: 36.0408521, lng: 129.3678551},
      {id: 2, lat: 36.0238521, lng: 129.3378551},
      {id: 3, lat: 36.0438521, lng: 129.3278551},
      {id: 4, lat: 36.0128521, lng: 129.3178551},
    ],
    paths: [
      [
        {lat: 36.0508521, lng: 129.3578551},
        {lat: 36.0708521, lng: 129.3678551},
        {lat: 36.0538521, lng: 129.3378551},
      ],
    ],
    count: 0,
    markerIcon: {
      url: markerPng,
      size: {width: 24, height: 32},
      scaledSize: {width: 24, height: 32},
      anchor: {x: 12, y: 32},
    },
  }

  componentDidMount() {
    const self = this
    // setInterval(() => {
    //   self.setState(state => ({count: state.count+1}))
    // }, 1000)
  }

  handleBoundChange = bounds => {
    // console.log(bounds)
    this.setState({bounds})
  }

  handleMapClick = e => {
    const lat = e.latlng.lat(),
      lng = e.latlng.lng()
    this.setState(state => ({markers: [...state.markers, {id: +new Date(), lat, lng}]}))
    // this.setState(state => ({paths: [[...state.paths[0], {lat, lng}]]}) )
    // console.log(e)
  }

  handleMarkerClick = (id, e) => {
    // console.log(e)
    // console.log(id)
    this.setState(state => ({markers: state.markers.filter(m => m.id !== id)}))
  }

  handleInOverlayClick = () => {
    console.log('handleInOverlayClick')
    this.setState({removeOverlay: true})
  }

  handleMapInit = (map, naver) => {
    // const polygon1 = new naver.maps.Polygon({
    //   paths: [
    //       [
    //         {lat:36.0208521 ,lng:129.3578551},
    //         {lat:36.0408521 ,lng:129.3678551},
    //         {lat:36.0238521 ,lng:129.3378551},
    //       ]
    //   ],
    //   fillColor: '#ff0000',
    //   fillOpacity: 0.3,
    //   strokeColor: '#ff0000',
    //   strokeOpacity: 0.6,
    //   strokeWeight: 3
    // });
    // polygon1.setMap(map)
    // const polygon2 = new naver.maps.Polygon({
    //   map: map,
    //   paths: [
    //       [
    //         {lat:36.0238521 ,lng:129.3378551},
    //         {lat:36.0438521 ,lng:129.3278551},
    //         {lat:36.0128521 ,lng:129.3178551},
    //       ]
    //   ],
    //   fillColor: '#ffd000',
    //   fillOpacity: 0.3,
    //   strokeColor: '#ffd000',
    //   strokeOpacity: 0.6,
    //   strokeWeight: 3
    // });
  }

  render() {
    const bounds = {
      south: 35.9732265,
      west: 129.2055044,
      north: 36.1130996,
      east: 129.4883056,
    }
    const {markers, paths, count} = this.state

    const pathProps = {
      fillColor: '#f0ff0f',
      fillOpacity: 0.5,
      strokeColor: '#f04da8',
      strokeOpacity: 0.9,
      strokeWeight: 3,
    }

    const on = parseInt(count / 2, 10) % 2 === 0

    return (
      <div>
        <h1>react-naver-map Demo</h1>
        <img src={markerPng} />
        <img src={markerPng2} />

        <NaverMap
          clientId="WLJzLUr0OFda9Gac2EBS"
          style={{width: '500px', height: '500px'}}
          initialPosition={{lat: 36.0208521, lng: 129.3578551}}
          // initialZoom={6}
          // initialBounds={bounds}
          onInit={this.handleMapInit}
          onBoundChange={this.handleBoundChange}
          onMapClick={this.handleMapClick}
          debug={true}
          // test={true}
          submodules={['geocoder']}>
          {markers.map(marker => (
            <CustomMarker
              key={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              onClick={e => this.handleMarkerClick(marker.id, e)}
            />
          ))}
          {markers.map((marker, i) => (
            <Overlay
              key={`${marker.lat},${marker.lng},${marker.id}`}
              id={`${marker.lat},${marker.lng},${marker.id}`}
              lat={marker.lat}
              lng={marker.lng}
              anchor={{x: -24, y: -64}}
              zIndex={on ? 100 + i : 100 - i}
              render={<MyMarker num={i} />}
              onClick={e => {
                console.log('overclick')
                e.stopPropagation()
              }}
            />
          ))}
          <NaverMap.Overlay
            id="kong-img"
            lat={36.020852}
            lng={129.3578551}
            zIndex={200}
            onClick={e => {
              console.log('overclick')
              e.stopPropagation()
            }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                marginLeft: '-50px',
                marginTop: '-50px',
                padding: '5px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
              }}
              // onClick={(e) => {console.log('overclick'); e.stopPropagation()}}
            >
              <img src={kongImg} style={{width: '100%', height: '100%'}} />
            </div>
          </NaverMap.Overlay>
          <Marker
            key={`test-marker-change`}
            id={`test-marker-change`}
            lat={36.07}
            lng={129.35}
            // onClick={e => this.handleMarkerClick(marker.id, e)}
            icon={this.state.markerIcon}
            shape={{coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12], type: 'poly'}}
          />
          {/*
        {!this.state.removeOverlay && (
          <Overlay id={'$1'} lat={36.0208521} lng={129.3578551} style={{backgroundColor:'white', zIndex:100, transform: 'translate(-50%, -100%)'}}>
            <div onMouseOver={() => console.log('Overlay Mouse Over!!')} >
              <button onClick={this.handleInOverlayClick}>Close</button>
            </div>
          </Overlay>
        )}
        <Overlay id={'$2'} lat={36.0408521} lng={129.3678551 -(this.state.count/10000)} anchor={{x:-24, y:-64}} >
          <img onClick={() => console.log('overlay image Click')} src={markerSvg} style={{height:'64px'}} />
        </Overlay>
        */}
          <Polyline id={'test2'} path={paths[0]} {...pathProps} />
          {on && (
            <Polygon
              id={'test-polygon-2'}
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
              {...pathProps}
            />
          )}
        </NaverMap>

        <button onClick={() => console.log('infoWindow onClose')}>Close</button>
        {this.state.bounds && (
          <div>
            <h4>onBoundChange</h4>
            <p>west: {this.state.bounds.west()}</p>
            <p>east: {this.state.bounds.east()}</p>
            <p>north: {this.state.bounds.north()}</p>
            <p>south: {this.state.bounds.south()}</p>
          </div>
        )}
      </div>
    )
  }
}

export default App
