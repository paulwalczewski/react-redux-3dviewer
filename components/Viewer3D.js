import React, { Component, PropTypes } from 'react'
import BABYLON from 'babylonjs';
// import {initRender} from './viewer3dcomponents/threeJSrender'; 


/**
       * sceneDefaults
       * list of babylon js vectors, that build up scene.
       * @type {Object}
 */
export default class Viewer3D extends Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.animationPlay = this.animationPlay.bind(this);
    this.animationStop = this.animationStop.bind(this);

    this.state = {
      rotating : props.rotating,
      sceneOptions: props.sceneOptions,
      babylonScene: {},
      showPreloader : true,
      preloaderText : this.props.preloaderText,
      cacheModel: this.props.cacheModel || false
    }
  }
  
  componentDidMount(){
    this.renderView();
  }

  renderView(){
      const { children, inputValue, modelSource } = this.props;
      let that = this;

       /**
       * sceneOptions defaults
       * list of babylon js options, that build up scene if no props provided
       * @type {Object}
       */
      that.state.sceneOptions = {
        rotating: this.props.rotating,
        cameraTargetVector: this.props.cameraTargetVector || new BABYLON.Vector3(0, 0, 0),
        cameraPositionVector: this.props.cameraPositionVector || new BABYLON.Vector3(1, 2, -6),
        lightVector:  this.props.lightVector || new BABYLON.Vector3(0, 5, 1),
        lightIntensity: this.props.lightIntensity || 1.2
      }

      that.showPreloader();

      let canvas = document.getElementById("viewer3dCanvas");
      let engine = new BABYLON.Engine(canvas, true);
      
      if(this.state.cacheModel === false){
        engine.enableOfflineSupport = false;
      }
      
      BABYLON.SceneLoader.ShowLoadingScreen = false; //turns off default ugly babylonjs preloader

      BABYLON.SceneLoader.Load("", modelSource, engine, function (scene) {
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 20, that.state.sceneOptions.cameraTargetVector, scene);

        that.state.babylonScene = scene;
        that.babylonCamera = camera;

        camera.attachControl(canvas, true);
        camera.setPosition(that.state.sceneOptions.cameraPositionVector);

        scene.clearColor = new BABYLON.Color4(0,0,0,0); //transparent background
      
        let light = new BABYLON.HemisphericLight("hemi", that.state.sceneOptions.lightVector, scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        light.intensity = that.state.sceneOptions.lightIntensity;
        
        that.hidePreloader();
        engine.runRenderLoop(function() {
            scene.render();
            if(that.state.rotating === true){
              scene.activeCamera.alpha += .005;
            }
        });
      })
      window.addEventListener("resize", function () {
          engine.resize();
      });
      return;

  }

  getMainObject(){
    return this.state.babylonScene.meshes[0];
  }

  rotateObj(obj, direction, value){
    if(!value) value = 1;
    if(direction === 'left'){
      value = -value;
    }
    let animationRotate = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    obj.animations.length = 0; //resets previous animations
    obj.rotation.y 
    let keys = [];  
    keys.push({
        frame: 0,
        value: obj.rotation.y
    });
    keys.push({
        frame: 20,
        value: obj.rotation.y + value
    });
    animationRotate.setKeys(keys);
    let easingFunction = new BABYLON.QuarticEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    animationRotate.setEasingFunction(easingFunction);
    obj.animations.push(animationRotate);
    this.state.babylonScene.beginAnimation(obj, 0, 20, false);
  }

  rotateLeft(){
    let obj = this.getMainObject();
    this.rotateObj(obj, 'left', 1.2);
  }

  rotateRight(){
     let obj = this.getMainObject();
     this.rotateObj(obj, 'right', 1.2);
  }

  zoomIn(){
     this.babylonCamera.radius -= 1;
  }

  zoomOut(){
     this.babylonCamera.radius += 1;
  }

  showPreloader(){
    var newState = {
      showPreloader : true
    }
    this.setState(newState)
  }

  hidePreloader(){
    var newState = {
      showPreloader : false
    }
    this.setState(newState)
  }

  animationPlay(){
     var newState = {
        rotating : true
     }
     this.setState(newState);
  }

  animationStop(){
     var newState = {
        rotating : false
     }
     this.setState(newState);
  }

  renderPlayBtn(rotating){
    if(rotating === false){
      return <button onClick={this.animationPlay} className='viewer3d-btn-animation-play'><i className="material-icons">play_circle_outline</i></button>
    } else {
      return <button onClick={this.animationStop} className='viewer3d-btn-animation-stop'><i className="material-icons">pause_circle_outline</i></button>
    }
  }

  renderPreloader(showPreloader, text){
    let visibleClass = (showPreloader) ? "viewer3d-preloader shown" : "viewer3d-preloader hidden";
    return <div className={visibleClass}>
            <div className='preloader-content-wrap'>
              <div className='preloader-circle'></div>
              <span className='preloader-title'>{text}</span>
            </div>
          </div>
  }

  render() {
    const { children, showControls, inputValue, modelSource, sceneDimensions = {}, rotating} = this.props;
    let width = sceneDimensions.width || 800;
    let height = sceneDimensions.height || 500;
    return (
      <div id='viewer3dContainer'>
          <canvas width={width} height={height} id='viewer3dCanvas' onLoad={this.renderView}></canvas>
          {this.renderPreloader(this.state.showPreloader, this.state.preloaderText)}
          {showControls ? (
          <section className='viewer3d-controls'>
            <button onClick={this.rotateLeft} className='viewer3d-btn-rotate-left'><i className="material-icons">undo</i></button>
            <button onClick={this.rotateRight} className='viewer3d-btn-rotate-right'><i className="material-icons">redo</i></button>
            <button onClick={this.zoomIn} className='viewer3d-btn-rotate-zoom-in'><i className="material-icons">zoom_in</i></button>
            <button onClick={this.zoomOut} className='viewer3d-btn-rotate-zoom-out'><i className="material-icons">zoom_out</i></button>
            {this.renderPlayBtn(this.state.rotating)}
          </section>
          ): null}
      </div>
    )
  }
}

Viewer3D.propTypes = {
  modelSource: PropTypes.string.isRequired,
  cacheModel: PropTypes.bool,
  rotating: PropTypes.bool,
  cameraPositionVector: PropTypes.object,
  lightVector:  PropTypes.object,
  lightIntensity: PropTypes.number,
  showControls: PropTypes.bool,
  sceneDimensions: PropTypes.object,
  rotating: PropTypes.bool,
  preloaderText: PropTypes.string
}