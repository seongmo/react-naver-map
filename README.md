# react-naver-map

> React NaverMap Component

[![NPM](https://img.shields.io/npm/v/react-naver-map.svg)](https://www.npmjs.com/package/react-naver-map)

네이버 지도 자바스크립트 v3을 감싼 리액트 컴포넌트 입니다.

0.0.21 버전부터 Marker, Polyline, Polygon에서 id를 받지 않습니다. 또한 onClick에서도 id를 더이상 리턴하지 않습니다.


## Install

```bash
npm install --save react-naver-map
```



## Usage

## Display map

```jsx
import NaverMap from 'react-naver-map'

...

render() {
  return (
    <NaverMap
      clientId='...'
      ncp // 네이버 클라우드 플랫폼 사용여부
      style={{width:'500px', height:'500px'}}
      initialPosition={{lat:37.3595704, lng:127.105399}}
      initialZoom={8}
      initialBounds={{   // When you provide initialBounds, it will ignores initialPosition and initialZoom
        south:35.9732265, west:129.2055044, 
        north:36.1130996, east:129.4883056
      }}
      onInit={(map, naver) => {...}}  // map: naver map object, naver: window.naver object
      onBoundChange={(bounds) => {...}}  // bounds: naver.maps.LatLngBounds
      onMapClick={(event) => {...}}  // event: PointerEvent 
      submodules={['drawing','geocoder']} 
    />
  )
}
```


## Display markers

```jsx
import NaverMap, {Marker} from 'react-naver-map'
import markerPng from './marker.png'

...

render() {
  return (
    <NaverMap>
      {markers.map(marker => (
        <Marker 
          key={...} 
          lat={marker.lat} 
          lng={marker.lng}
          onClick={event => {...}}  // id: given id, event: PointerEvent 
          icon={{
            url: markerPng,
            size:{width:24,height:32},
            scaledSize:{width:24,height:32},
            anchor: {x:12, y:32}
          }}
          shape={{coords: [0,12, 12,0, 24,12, 12,32, 0,12], type: 'poly'}}  // click mask shape
        />
      ))}
    </NaverMap>
  )
}
```


## Display polyline and ploygon

```jsx
import NaverMap from 'react-naver-map'

...

render() {
  return (
    <NaverMap>
      <NaverMap.Polyline 
        path={[
          {lat:37.359924641705476, lng: 127.1148204803467},
          {lat:37.36343797188166, lng: 127.11486339569092},
          {lat:37.368520071054576, lng: 127.11473464965819},
          {lat:37.3685882848096, lng: 127.1088123321533},
        ]}
        strokeColor={'#f04da8'}
        strokeOpacity={0.7}
        strokeWeight={3}
      />
      <NaverMap.Polygon 
        paths={[
          [
            {lat: 37.37544345085402, lng: 127.11224555969238},
            {lat: 37.37230584065902, lng: 127.10791110992432},
            {lat: 37.35975408751081, lng: 127.10795402526855},
            {lat: 37.359924641705476, lng: 127.11576461791992},
            {lat: 37.35931064479073, lng: 127.12211608886719},
            {lat: 37.36043630196386, lng: 127.12293148040771},
            {lat: 37.36354029942161, lng: 127.12310314178465},
            {lat: 37.365211629488016, lng: 127.12456226348876},
            {lat: 37.37544345085402, lng: 127.1122455596923})
          ],
          [
            {lat: 37.368485964153784, lng: 127.10971355438232},
            {lat: 37.368520071054576, lng: 127.11464881896971},
            {lat: 37.36350619025713, lng: 127.11473464965819},
            {lat: 37.363403862670665, lng: 127.1097993850708},
            {lat: 37.368485964153784, lng: 127.1097135543823})
          ]
        ]} 
        fillColor={'#ff0000'}
        fillOpacity={0.3}
        strokeColor={'#ff0000'}
        strokeOpacity={0.6}
        strokeWeight={3}
      /> 
    </NaverMap>
  )
}
```


## Display Overlay

```jsx
import NaverMap, {Overlay} from 'react-naver-map'

...

render() {
  return (
    <NaverMap>
      <Overlay
        lat={37.3595704}
        lng={127.105399}
        zIndex={200}
        onClick={e => {
          console.log('overclick')
          e.stopPropagation()
        }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: 'white',
          }}>
          <img src={imgSrc} alt="overImg" style={{width: '100%', height: '100%'}} />
        </div>
      </Overlay>
    </NaverMap>
  )
}
```


## License

MIT © [seongmo](https://github.com/seongmo)
