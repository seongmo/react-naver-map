import React from 'react'
import NaverMap from 'react-naver-map'
import ReactJson from 'react-json-view'
import './style.css'

const clientId = process.env.REACT_APP_CLIENT_ID

class App extends React.Component {
  state = {
    bounds: undefined,
  }

  handleBoundChange = bounds => {
    this.setState({bounds})
  }

  handleMapClick = e => {
    console.log(e)
  }

  handleMapInit = (map, naver) => {}

  render() {
    return (
      <div>
        <h1>Basic</h1>
        <div style={{display: 'flex'}}>
          <NaverMap
            clientId={clientId}
            style={{width: '400px', height: '400px'}}
            initialPosition={{lat: 36.0208521, lng: 129.3578551}}
            // initialZoom={6}
            // initialBounds={bounds}
            onInit={this.handleMapInit}
            onBoundChange={this.handleBoundChange}
            onMapClick={this.handleMapClick}
          />
          <div>
            <h4>onBoundChange</h4>
            <ReactJson root="bounds" src={this.state.bounds} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
