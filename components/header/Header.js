import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import './header.scss';
import { Link } from 'react-router'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul className="top-menu">
        	<li><Link to={'/'}>Home</Link></li>
        	<li><Link to={'/about'}>About</Link></li>
        </ul>
      </div>
    )
  }
}
