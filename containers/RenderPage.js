import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Viewer3D from '../components/Viewer3D'


//additional, not required scene options
let sceneOptions = {
  width : 700,
  height : 500
}

class RednerPage extends Component {
  render() {
    return (
      <div>
      	<h3>Render page...</h3>
      	<Viewer3D modelSource="/cube.json" sceneOptions={sceneOptions} showControls="true"  />
      </div>
    )
  }
}

RednerPage.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(RednerPage)
