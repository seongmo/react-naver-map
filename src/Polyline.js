import React from 'react'
import t from 'prop-types'
// import * as R from 'ramda'

export default class Polyline extends React.Component {
  static propTypes = {
    path: t.array.isRequired,
    strokeColor: t.string,
    strokeOpacity: t.number,
    strokeWeight: t.number,
  }

  componentDidMount() {
    const {naver, mapNaver} = this.context

    const polyline = new naver.maps.Polyline({
      path: this.props.path,
      strokeColor: this.props.strokeColor,
      strokeOpacity: this.props.strokeOpacity,
      strokeWeight: this.props.strokeWeight,
    })
    this.polyline = polyline

    polyline.setMap(mapNaver)
  }

  // shouldComponentUpdate(prevProps) {
  //   return !R.eqBy(R.props(['lat', 'lng','icon']), prevProps, this.props)
  // }

  componentDidUpdate() {
    // const {lat, lng, icon} = this.props
    if (!this.polyline) return null
    const polyline = this.polyline

    const prevPath = polyline
      .getPath()
      .getArray()
      .map(p => ({lat: p.y, lng: p.x}))
    const nextPath = this.props.path

    if (JSON.stringify(prevPath) !== JSON.stringify(nextPath)) {
      polyline.setPath(nextPath)
    }
  }

  componentWillUnmount() {
    const {naver} = this.context
    if (!naver || !this.polyline) return
    const polyline = this.polyline
    // naver.maps.Event.removeListener(polyline.clickEventListener)
    polyline.setMap(null)
  }

  render() {
    return null
  }
}
