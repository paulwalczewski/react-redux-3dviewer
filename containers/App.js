import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Header from '../components/header/Header'
import { resetErrorMessage } from '../actions'
import './app.scss';


class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue, currentUrl } = this.props;
    const menuLinks = [
      {
        label: "Example - 3D model",
        url: '/'
      },
      {
        label: "Example - 360 deg images",
        url: '/example-images-as-source'
      },
      {
        label: "React starter kit",
        url: '/StarterKitPage'
      }
    ]
    return (
      <div>
        <Header currentUrl={currentUrl} menuLinks={menuLinks} ></Header>
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1),
    currentUrl: state.router.location.pathname
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState
})(App)
