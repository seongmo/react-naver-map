import React from 'react'
import t from 'prop-types'
// import * as R from 'ramda'

export default class Polygon extends React.Component {
  static propTypes = {
    paths: t.arrayOf(t.array.isRequired).isRequired,
    fillColor: t.string,
    fillOpacity: t.number,
    strokeColor: t.string,
    strokeOpacity: t.number,
    strokeWeight: t.number,
  }

  componentDidMount() {
    const {naver, mapNaver} = this.context

    const polygon = new naver.maps.Polygon({
      paths: this.props.paths,
      fillColor: this.props.fillColor,
      fillOpacity: this.props.fillOpacity,
      strokeColor: this.props.strokeColor,
      strokeOpacity: this.props.strokeOpacity,
      strokeWeight: this.props.strokeWeight,
    })
    this.polygon = polygon

    polygon.setMap(mapNaver)
  }

  // shouldComponentUpdate(prevProps) {
  //   return !R.eqBy(R.props(['lat', 'lng','icon']), prevProps, this.props)
  // }

  componentDidUpdate() {
    // const {lat, lng, icon} = this.props
    if (!this.polygon) return null
    const polygon = this.polygon

    const prevPaths = polygon
      .getPaths()
      .getArray()
      .map(ar => ar.getArray().map(p => ({lat: p.y, lng: p.x})))
    const nextPaths = this.props.paths

    if (JSON.stringify(prevPaths) !== JSON.stringify(nextPaths)) {
      polygon.setPaths(nextPath)
    }
  }

  componentWillUnmount() {
    const {naver} = this.context
    if (!naver || !this.polygon) return
    const polygon = this.polygon
    // naver.maps.Event.removeListener(polygon.clickEventListener)
    polygon.setMap(null)
  }

  render() {
    return null
  }
}
