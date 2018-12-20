import React from 'react'
import ReactDOM from 'react-dom'
import t from 'prop-types'

export default class Overlay extends React.Component {
  static propTypes = {
    lat: t.number.isRequired,
    lng: t.number.isRequired,
    anchor: t.shape({
      x: t.number.isRequired,
      y: t.number.isRequired,
    }),
    size: t.shape({
      width: t.number.isRequired,
      height: t.number.isRequired,
    }),
    zIndex: t.number,
  }
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    const {naver, mapNaver, CustomOverlay} = this.context
    const {lat, lng, icon, shape} = this.props

    // const mapNaver = this.props.mapNaver

    if (this.props.onClick) {
      this.el.addEventListener('click', this.props.onClick)
    }

    this.overlay = new CustomOverlay({
      element: this.el,
      position: {y: lat, x: lng},
      anchor: this.props.anchor,
      size: this.props.size,
      zIndex: this.props.zIndex,
      map: mapNaver,
    })
  }

  // shouldComponentUpdate(prevProps) {
  //   return !R.eqBy(R.props(['lat', 'lng','icon']), prevProps, this.props)
  // }

  componentDidUpdate() {
    const {lat, lng, icon} = this.props
    if (!this.overlay) return null
    const overlay = this.overlay

    overlay.setPosition({y: this.props.lat, x: this.props.lng})
    overlay.setAnchor(this.props.anchor)
    this.props.zIndex && overlay.setZIndex(this.props.zIndex)
  }

  componentWillUnmount() {
    const {naver} = this.context
    if (!naver || !this.overlay) return
    const overlay = this.overlay
    this.el.removeEventListener('click', this.props.onClick)
    overlay.setMap(null)
  }

  render() {
    return ReactDOM.createPortal(this.props.render || this.props.children, this.el)
  }
}

export const getCustomOverlayClass = naver => {
  return class CustomOverlay extends naver.maps.OverlayView {
    constructor(options) {
      super()
      this._element = options.element
      this.anchor = options.anchor || {x: 0, y: 0}
      this.size = options.size
      this.zIndex = options.zIndex
      this.setPosition(options.position)
      this.setMap(options.map || null)
    }

    setPosition = position => {
      this._position = position
      this.draw()
    }

    getPosition = () => {
      return this._position
    }

    setZIndex = zIndex => {
      if (zIndex !== this.zIndex) {
        this.zIndex = zIndex
        this.draw()
      }
    }

    setAnchor = anchor => {
      if (
        anchor &&
        !!anchor.x &&
        !!anchor.y &&
        (anchor.x !== this.anchor.x || anchor.y !== this.anchor.y)
      ) {
        this.anchor.x = anchor.x
        this.anchor.y = anchor.y
        this.draw()
      }
    }

    onAdd = () => {
      const overlayLayer = this.getPanes().overlayImage
      overlayLayer.appendChild(this._element)
    }

    draw = () => {
      if (!this.getMap()) return

      const projection = this.getProjection(),
        position = this.getPosition(),
        pixelPosition = projection.fromCoordToOffset(position)

      this._element.style.position = 'absolute'
      this._element.style.left = pixelPosition.x + this.anchor.x + 'px'
      this._element.style.top = pixelPosition.y + this.anchor.y + 'px'

      if (this.size) {
        this._element.style.width = this.size.width + 'px'
        this._element.style.height = this.size.height + 'px'
      }
      if (this.zIndex) {
        this._element.style.zIndex = this.zIndex
      }
    }

    onRemove = () => {
      const overlayLayer = this.getPanes().overlayLayer

      // it's because IE does not support remove method
      if (this._element.remove) {
        this._element.remove()
      } else {
        this._element.parentNode.removeChild(this._element)
      }
    }
  }
}
