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
    let currentUrl = this.props.currentUrl;
    return (
        <nav className="top-menu">
        <ul> 
          {this.props.menuLinks.map(function(link, i){
            let classType = (link.url === currentUrl) ? 'active' : 'normal';
            return <li key={i}>
               <Link to={link.url} className={classType}>{link.label}</Link>
            </li>
          })}
        </ul>
        </nav>
    )
  }
}
