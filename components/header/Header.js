import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import './header.scss';

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul className="top-menu">
        	<li>Home</li>
        	<li>About</li>
        </ul>
      </div>
    )
  }
}
