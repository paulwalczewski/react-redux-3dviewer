import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BABYLON from 'babylonjs';
// import {initRender} from './viewer3dcomponents/threeJSrender'; 

var api = {};
    api.babylon = {
          sceneVars : {
              canvas : null,
              engine : null,
              scene : null
          },
          createScene : function(){
           var mycanvas = document.createElement("canvas");
            mycanvas.id = "mycanvas";
            document.body.appendChild(mycanvas);
           if (BABYLON.Engine.isSupported()) {
             this.sceneVars.canvas = document.getElementById("viewer3Dcontainer");
             this.sceneVars.engine = new BABYLON.Engine(this.sceneVars.canvas, true);
             this.sceneVars.scene = new BABYLON.Scene(this.sceneVars.engine);
             BABYLON.SceneLoader.Load("", "cube.babylon", this.sceneVars.engine, function (scene) {        
                  scene.executeWhenReady(function () {
                      api.babylon.sceneVars.scene = scene;
                      scene.clearColor = new BABYLON.Color3(1, 1, 1); //sets white background to 3d scene (otherwise screenshots got black backgrounds)
                      var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 1, 1.5, 2.2, new BABYLON.Vector3(0, 0, 0), scene);
                           camera.angularSensibility = 700;
                           camera.wheelPrecision = 300;
                           scene.activeCamera = camera;
                           // camera.alpha = -2.06930864519154; //for cup example - sets initial rotation of a cup
                           scene.activeCamera.attachControl(api.babylon.sceneVars.canvas, null, "x");
                           scene.autoClear = false; //fixes slight red/pink background

                      var light0 = new BABYLON.HemisphericLight("Dir0", new BABYLON.Vector3(0, 0, 1), scene);
                      light0.diffuse = new BABYLON.Color3(0.45, 0.45, 0.45);
                      light0.specular = new BABYLON.Color3(0.45, 0.45, 0.45);


                       var light1 = new BABYLON.HemisphericLight("Dir1", new BABYLON.Vector3(0, 0, -1), scene);
                      light1.diffuse = new BABYLON.Color3(0.45, 0.45, 0.45);
                      light1.specular =new BABYLON.Color3(0.45, 0.45, 0.45);


                      var light2 = new BABYLON.HemisphericLight("Dir2", new BABYLON.Vector3(-20, 0, 0), scene);
                      light2.diffuse = new BABYLON.Color3(0.45, 0.45, 0.45);
                      light2.specular = new BABYLON.Color3(0.45, 0.45, 0.45);

                      var light3 = new BABYLON.HemisphericLight("Dir3", new BABYLON.Vector3(20, 0, 0), scene);
                      light3.diffuse = new BABYLON.Color3(0.45, 0.45, 0.45);
                      light3.specular = new BABYLON.Color3(0.45, 0.45, 0.45);
                        

                      // Once the scene is loaded, just register a render loop to render it
                      api.babylon.sceneVars.engine.runRenderLoop(function() {
                          scene.render();
                      });
                  });
              }, function (progress) {
                console.log("progress=", progress);
                
                  // To do: give progress feedback to user
              });
         }
      }
}


export default class Viewer3D extends Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
  }
  
  renderView(){
      const { children, inputValue, modelSource } = this.props

      api.babylon.createScene();

      // initRender();
    
     
      return;

  }

  render() {
    const { children, inputValue, modelSource, sceneOptions = {} } = this.props;

    let width = sceneOptions.width || 800;
    let height = sceneOptions.height || 800; 

    return (
      <div>
          {/*<div id="viewer3Dcontainer"></div>*/}
          <canvas width={width} height={height} id='viewer3Dcontainer'></canvas>
          <button onClick={this.renderView}>Renderuj</button>
      </div>
    )
  }
}


Viewer3D.propTypes = {
  modelSource: PropTypes.string.isRequired
}