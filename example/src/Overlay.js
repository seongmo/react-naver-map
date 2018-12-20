import React from 'react'
import kongImg from './kong.jpg'
import './style.css'

import NaverMap, {Overlay} from 'react-naver-map'

const clientId = process.env.REACT_APP_CLIENT_ID

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

const bounds = {
  south: 35.9732265,
  west: 129.2055044,
  north: 36.1130996,
  east: 129.4883056,
}

const App = () => (
  <div>
    <h1>Overlay</h1>

    <NaverMap clientId={clientId} style={{width: '500px', height: '500px'}} initialBounds={bounds}>
      <Overlay
        lat={36.020852}
        lng={129.3578551}
        zIndex={200}
        onClick={e => {
          console.log('overclick')
          e.stopPropagation()
        }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            marginLeft: '-60px',
            marginTop: '-60px',
            padding: '5px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
          }}>
          <img src={kongImg} alt="my-cat-kong" style={{width: '100%', height: '100%'}} />
        </div>
      </Overlay>
      <Overlay
        lat={36.120852}
        lng={129.3578551}
        zIndex={200}
        onClick={e => {
          console.log('overclick')
          e.stopPropagation()
        }}>
        <MyMarker num={7} />
      </Overlay>
    </NaverMap>
  </div>
)

export default App
