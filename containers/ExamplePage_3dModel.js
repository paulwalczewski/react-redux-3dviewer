import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BABYLON from 'babylonjs';
import Viewer3D from '../components/Viewer3D'

import { Link } from 'react-router'

class ExamplePage_3dModel extends Component {
  render() {
    return (
      <div>
        <h1 className='page-title'>
          Viewer3D example - 3d model as source
          <span className='page-subtitle'>ReactJS component for displaying 3D products</span>
        </h1>
        
        {/**
         * Viewer 3D component.
         * Note - modelSource is the only required prop. 
         * Exported babylon scene should have main object (mesh) set as a first object of a scene. It is tagged then as a main object, and used when controls are are active.
         */}
      	<Viewer3D 
            modelSource='CupExample.babylon'
            cacheModel={false}
            rotating={true}
            sceneDimensions= {{width : document.body.clientWidth, height : 500}}
            cameraTargetVector= {new BABYLON.Vector3(0, 0, 0)}
            cameraPositionVector= {new BABYLON.Vector3(1, 2, -6)}
            lightVector= {new BABYLON.Vector3(0, 5, 1)}
            lightIntensity= {1.4}
            preloaderText='Loading...'
            showControls={true}  />

         <article className='page-article'>
            <h3>Info:</h3>
            <p>This example uses babylonjs 3D model to render full 3d scene.
            </p>
            <p>If you are going to use only this type without 360&deg; images set as a source (<Link to="/example-images-as-source">example</Link>), then you can take only this render component 
            - Viewer3D_render_babylon.js and use it the same you would use basic Viewer3D component:
             &#x3C;Viewer3D_babylon modelSource='CupExample.babylon' /&#x3E;
            </p>
            <h3>Usage:</h3>
            <ol>
              <li>Install required dependency (babylonjs library) in your project:<br/>
                <div className='code'>
                  npm install babylonjs --save
                </div>
              </li>
              <li>
                Copy Viewer3D component (Viewer3D.js) into your project
              </li>
              <li>Import required files in your React view:<br/>
                <div className='code'>
                import BABYLON from 'babylonjs';<br/>
                import Viewer3D from '../components/Viewer3D'
                </div>
              </li>
              <li>Use component.<br/>
                <div className='code'>
                   &#x3C;Viewer3D modelSource='CupExample.babylon' /&#x3E;
                </div>
                <p>
                  Note - modelSource is the only property that is required, but be sure to check out <a href='#optionalParams'>optional params</a> as well.
                </p>
              </li>
              <li>(optional) Install material icons (used in controls buttons) <br/>
                <div className='code'>
                  &#x3C;link href=&#x22;https://fonts.googleapis.com/icon?family=Material+Icons&#x22; rel=&#x22;stylesheet&#x22; /&#x3E;
                </div>
              </li>
             </ol>
             <h3 id='optionalParams'>Options:</h3>
             <table>
             <tbody>
                <tr>
                  <th>Prop</th>
                  <th>type</th>
                  <th>default value</th>
                  <th>required</th>
                  <th>description</th>
                </tr>
                <tr>
                  <td>showControls</td><td>boolean</td><td>true</td><td>no</td><td>Defines whether controls should be visible or not.</td>
                </tr>
                <tr>
                  <td>modelSource</td><td>string</td><td>-</td><td>yes</td><td>Url to 3d .babylon model. More info about exporting proper models from Blender, 3dMax etc.: <a href='http://doc.babylonjs.com/exporters' target='_blank'>http://doc.babylonjs.com/exporters</a></td>
                </tr>
                <tr>
                  <td>rotating</td><td>boolean</td><td>true</td><td>no</td><td>If set to true, images will be rotating by default</td>
                </tr>
                 <tr>
                  <td>cacheModel</td><td>boolean</td><td>false</td><td>no</td><td>Should browser cache 3d models. If set to true, .manifest file must be provided along with .babylon model.</td>
                </tr>
                <tr>
                  <td>sceneDimensions</td><td>object</td><td>width:800, height:500</td><td>no</td><td>Dimensions of created scene.</td>
                </tr>
                <tr>
                  <td>cameraPositionVector</td><td>object (babylonjs object)</td><td>BABYLON.Vector3(1, 2, -6)</td><td>no</td><td>Defines where the camera is placed in 3d scene.</td>
                </tr>
                <tr>
                  <td>cameraTargetVector</td><td>object (babylonjs object)</td><td>BABYLON.Vector3(0,0,0)</td><td>no</td><td>Defines direction where camera is 'looking' in 3d scene.</td>
                </tr>
                <tr>
                  <td>lightVector</td><td>object (babylonjs object)</td><td>BABYLON.Vector3(0, 5, 1)</td><td>no</td><td>Defines direction where light is pointing in 3d scene.</td>
                </tr>
                <tr>
                  <td>lightIntensity</td><td>int</td><td>1.2</td><td>no</td><td>Defines how strong light should be.</td>
                </tr>
                <tr>
                  <td>preloaderText</td><td>string</td><td>null</td><td>no</td><td>Text displayed in preloader.</td>
                </tr>
               </tbody> 
             </table>
         </article>
      </div>
    )
  }
}

ExamplePage_3dModel.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(ExamplePage_3dModel)
