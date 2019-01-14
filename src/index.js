import React from 'react'
import PropTypes from 'prop-types'
import Script from 'react-load-script'
import Marker from './Marker'
import Overlay, {getCustomOverlayClass} from './Overlay'
import Polyline from './Polyline'
import Polygon from './Polygon'

const MapContext = React.createContext({
  naver: undefined,
  mapNaver: undefined,
  CustomOverlay: undefined,
})

Marker.contextType = MapContext
Overlay.contextType = MapContext
Polyline.contextType = MapContext
Polygon.contextType = MapContext

export {Marker, Overlay, Polyline, Polygon}

export const UiEvents = {
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  click: 'click',
  dblclick: 'dblclick',
  rightclick: 'rightclick',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  mousemove: 'mousemove',
  dragstart: 'dragstart',
  drag: 'drag',
  dragend: 'dragend',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchend: 'touchend',
  pinchstart: 'pinchstart',
  pinch: 'pinch',
  pinchend: 'pinchend',
  tap: 'tap',
  longtap: 'longtap',
  twofingertap: 'twofingertap',
  doubletap: 'doubletap',
}

class NaverMap extends React.Component {
  static Marker = Marker
  static Overlay = Overlay
  static Polygon = Polygon
  static Polyline = Polyline

  constructor(props) {
    super(props)
    const {clientId, submodules = [], ncp} = props
    let clientIdKey = ncp ? 'ncpClientId' : 'clientId'

    this.state = {
      loaded: false,
      CustomOverlay: undefined,
      nMapScriptUrl: `https://openapi.map.naver.com/openapi/v3/maps.js?${clientIdKey}=${clientId}&submodules=${submodules.join()}`,
      naver: undefined,
      mapNaver: undefined,
    }
    this.mapRef = React.createRef()
  }

  handleScriptCreate = () => {}

  handleScriptError = () => {
    console.error('naver map scritp error')
  }

  initMap = () => {
    const mapOpts = {}
    if (this.props.initialPosition) {
      mapOpts.center = this.props.initialPosition
    }
    if (this.props.initialZoom) {
      mapOpts.zoom = this.props.initialZoom
    }
    if (this.props.initialBounds) {
      mapOpts.bounds = this.props.initialBounds
    }

    this.naver = window.naver

    const mapNaver = new naver.maps.Map(this.mapRef.current, mapOpts)
    this.mapNaver = mapNaver

    const CustomOverlay = getCustomOverlayClass(window.naver)

    this.listeners = []
    // Regist Event Handler
    this.listeners.push(
      naver.maps.Event.addListener(mapNaver, 'bounds_changed', this.handleBoundChanged),
    )
    this.listeners.push(naver.maps.Event.addListener(mapNaver, 'click', this.handleMapClick))
    // Ui Events
    const listeningEvents = this.props.listeningEvents || []
    if (this.props.onUiEvent) {
      Object.values(UiEvents)
        .filter(evtType => listeningEvents.includes(evtType))
        .forEach(eventType => {
          this.listeners.push(
            naver.maps.Event.addListener(mapNaver, eventType, this.props.onUiEvent),
          )
        })
    }

    this.setState({naver, mapNaver, CustomOverlay, loaded: true})

    this.props.onInit && this.props.onInit(mapNaver, window.naver)
  }

  handleBoundChanged = bounds => {
    const self = this
    if (this.props.onBoundChange) {
      if (!this.lastBoundChangedTime || this.lastBoundChangedTime < +new Date() - 100) {
        this.lastBoundChangedTime = +new Date()
        self.props.onBoundChange(bounds)
      }
    }
  }

  handleMapClick = e => {
    this.props.onMapClick && this.props.onMapClick(e)
  }

  componentWillUnmount() {
    const {naver} = this

    this.listeners.forEach(listener => {
      naver.maps.Event.removeListener(listener)
    })
  }

  render() {
    const {nMapScriptUrl} = this.state
    const style = {position: 'relative', ...this.props.style}

    return (
      <div style={style}>
        <div ref={this.mapRef} style={{widht: '100%', height: '100%'}} />
        <Script
          url={nMapScriptUrl}
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.initMap}
        />
        <MapContext.Provider value={this.state}>
          {this.state.loaded && this.props.children}
        </MapContext.Provider>
      </div>
    )
  }
}

NaverMap.propTypes = {
  clientId: PropTypes.string.isRequired,
  ncp: PropTypes.bool,
  initialBounds: PropTypes.shape({
    east: PropTypes.number.isRequired,
    west: PropTypes.number.isRequired,
    south: PropTypes.number.isRequired,
    north: PropTypes.number.isRequired,
  }),
  initialPosition: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  initialZoom: PropTypes.number,
  onBoundChange: PropTypes.func,
  onMapClick: PropTypes.func,
  onUiEvent: PropTypes.func,
  listeningEvents: PropTypes.arrayOf(PropTypes.string),
  onInit: PropTypes.func,
  submodules: PropTypes.arrayOf(PropTypes.string),
}

export default NaverMap
