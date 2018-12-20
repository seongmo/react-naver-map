import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import './style.css'
import Basic from './Basic'
import Marker from './Marker'
import Overlay from './Overlay'
import Polyline from './Polyline'
import Polygon from './Polygon'

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" exact to="/">
              Basic
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/marker/">
              Marker
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/overlay/">
              Overlay
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/polyline/">
              Polyline
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/polygon/">
              Polygon
            </NavLink>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Basic} />
      <Route path="/marker/" component={Marker} />
      <Route path="/overlay/" component={Overlay} />
      <Route path="/polyline/" component={Polyline} />
      <Route path="/polygon" component={Polygon} />
    </div>
  </Router>
)

export default AppRouter
