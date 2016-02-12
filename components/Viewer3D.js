import React, { Component, PropTypes } from 'react'
import Viewer3D_babylon from './Viewer3D_render_babylon';
import Viewer3D_images from './Viewer3D_render_images';


export default class Viewer3D extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderer;
    if(this.props.modelSource && this.props.modelSource.endsWith('.babylon')){
      renderer = <Viewer3D_babylon {...this.props}></Viewer3D_babylon>
    } 
    else if(this.props.imagesList){
      renderer = <Viewer3D_images {...this.props}></Viewer3D_images>
    } else {
      throw "Error - either 3d model source or images list is required.";
    }
    return (
      <div>
        {renderer}
      </div>
    )
  }
}