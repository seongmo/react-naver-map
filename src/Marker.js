import React from 'react'
import t from 'prop-types'

const eqMarkerProps = (prev, cur) => {
  return ['lat', 'lng', 'icon'].every(k => prev[k] === cur[k])
}

export default class Marker extends React.Component {
  static propTypes = {
    lat: t.number.isRequired,
    lng: t.number.isRequired,
    shape: t.object,
    onClick: t.func,
  }

  componentDidMount() {
    const {naver, mapNaver} = this.context
    const {lat, lng, icon, shape} = this.props

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      icon: icon,
      shape: shape,
      // size: new naver.maps.Size(60, 73),
      // anchor: new naver.maps.Point(30, 73)
    })
    this.marker = marker
    if (this.props.onClick) {
      marker.clickEventListener = naver.maps.Event.addListener(marker, 'click', this.props.onClick)
    }
    marker.setMap(mapNaver)
  }

  shouldComponentUpdate(prevProps) {
    return !eqMarkerProps(prevProps, this.props)
  }

  componentDidUpdate() {
    const {lat, lng, icon} = this.props
    if (!this.marker) return null
    const marker = this.marker

    marker.setPosition({y: lat, x: lng})
    marker.setIcon(icon)
  }

  componentWillUnmount() {
    const {naver} = this.context
    if (!naver || !this.marker) return
    const marker = this.marker
    naver.maps.Event.removeListener(marker.clickEventListener)
    marker.setMap(null)
  }

  render() {
    return null
  }
}
