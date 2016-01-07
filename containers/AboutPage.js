import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class AboutPage extends Component {
  render() {
    return (
      <div>
        <h3>About page...</h3>
      </div>
    )
  }
}

AboutPage.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(AboutPage)
