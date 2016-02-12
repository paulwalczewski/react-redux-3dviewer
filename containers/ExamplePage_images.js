import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BABYLON from 'babylonjs';
import Viewer3D from '../components/Viewer3D'

import { Link } from 'react-router'

class ExamplePage_images extends Component {
  render() {
    var imagesList = [
        "360_images_example/1-tiny.jpg",
         "360_images_example/2-tiny.jpg",
         "360_images_example/3-tiny.jpg",
         "360_images_example/4-tiny.jpg",
         "360_images_example/5-tiny.jpg",
         "360_images_example/6-tiny.jpg",
         "360_images_example/7-tiny.jpg",
         "360_images_example/8-tiny.jpg",
         "360_images_example/9-tiny.jpg",
         "360_images_example/10-tiny.jpg",
         "360_images_example/11-tiny.jpg",
         "360_images_example/12-tiny.jpg",
         "360_images_example/13-tiny.jpg",
         "360_images_example/14-tiny.jpg",
         "360_images_example/15-tiny.jpg",
         "360_images_example/16-tiny.jpg",
         "360_images_example/17-tiny.jpg",
         "360_images_example/18-tiny.jpg",
         "360_images_example/19-tiny.jpg",
         "360_images_example/20-tiny.jpg",
         "360_images_example/21-tiny.jpg",
         "360_images_example/22-tiny.jpg",
         "360_images_example/23-tiny.jpg",
         "360_images_example/24-tiny.jpg"
    ];
    return (
      <div className='images-example'>
        <h1 className='page-title'>
          Viewer3D example - 360 degrees images as a source
          <span className='page-subtitle'>ReactJS component for displaying 3D products</span>
        </h1>
        
        {/**
         * Viewer 3D component.
         * Note - modelSource is the only required prop. 
         * Exported json list should have list of images that show object from all angles. The more images,
          the smoother the rotate, but it will take longer to load viewer.
         */}
      	<Viewer3D 
            imagesList={imagesList}
            rotating={false}
            sceneDimensions= {{width : document.body.clientWidth, height : 500}}
            preloaderText='Loading...'
            showControls={true}  />

         <article className='page-article'>
            <h3>Info:</h3>
            <p>This example uses set of images to render 360 degrees rotatable view. 
            </p>
            <p>It does not require babylonjs library to work, so if you are going to use only this type (no full 3D babylon as source), 
            then you can take only this render component - Viewer3D_render_images.js and use it the same you would use basic Viewer3D component:
             &#x3C;Viewer3D_images imagesList='array' /&#x3E;
            </p>
            <h3>Usage:</h3>
            <ol>
              <li>Install required dependency (babylonjs library) in your project:<br/>
                <div className='code'>
                  npm install babylonjs --save
                </div>
                (required if you are using it along with 3D babylon version (check "Info:" section above)
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
                  Note - imagesList is the only property that is required, but be sure to check out <a href='#optionalParams'>optional params</a> as well.
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
                  <td>rotating</td><td>boolean</td><td>false</td><td>no</td><td>If set to true, images will be rotating by default</td>
                </tr>
                <tr>
                  <td>imagesList</td><td>array</td><td>-</td><td>yes</td><td>List of urls to images.</td>
                </tr>
                <tr>
                  <td>sceneDimensions</td><td>object</td><td>width:800, height:500</td><td>no</td><td>Dimensions of created scene.</td>
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

ExamplePage_images.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(ExamplePage_images)
