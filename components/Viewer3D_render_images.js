import React, { Component, PropTypes } from 'react'
import BABYLON from 'babylonjs';
import './Viewer3D_render_images.scss';

export default class Viewer3D_images extends Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.animationPlay = this.animationPlay.bind(this);
    this.animationStop = this.animationStop.bind(this);

    this.state = {
      activeFrame: 0,
      dragging: false,
      zoomValue: 1,
      imagesList: [],
      imagesLoadedCount : 0,
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
    if(this.props.rotating === true){
        this.animationPlay();
    }
  }

  componentWillUnmount(){
    this.animationStop();
  }

  renderView(){
      const { children, inputValue, imagesList} = this.props;
      let that = this;

      that.state.sceneOptions = {
        imagesList: this.props.imagesList,
        rotating: this.props.rotating,
      }

      that.showPreloader();
   
      return;
  }

  rotateObj(obj, direction, value){
    if(!value) value = 1;
    if(direction === 'left'){
      value = -value;
    }
  }

  prevFrame(){
    var newFrame = this.getCurrentFrame() - 1;
    if(newFrame < 0) newFrame = this.props.imagesList.length - 1; //negative frame => go to last
    var newState = {
      activeFrame : newFrame
    }
    this.setState(newState)
  }

  nextFrame(){
    var newFrame = this.getCurrentFrame() + 1;
    if(newFrame > this.props.imagesList.length - 1) newFrame = 0; //last frame => go to first
    var newState = {
      activeFrame: newFrame
    }
    this.setState(newState)
  }

  getCurrentFrame(){
    return this.state.activeFrame;
  }

  rotateLeft(){
    this.prevFrame();
  }

  rotateRight(){
    this.nextFrame();
  }

  zoomIn(){
     this.setState({zoomValue: this.state.zoomValue+0.4});
  }

  zoomOut(){
     var newZoom = this.state.zoomValue-0.4;
     if(newZoom < 0.4) newZoom = 0.4;
     this.setState({zoomValue: newZoom});
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
     var that = this;
     var newState = {
        rotating : true
     }
     this.setState(newState);
     this.rotatingInterval = setInterval(function(){
        that.rotateLeft();
     },100)
  }

  animationStop(){
     var newState = {
        rotating : false
     }
     this.setState(newState);
     clearInterval(this.rotatingInterval);
  }

  dragStart(ev) {
    ev.preventDefault(); //prevents default browsers behaviour of image dragging
    var newState = {
      dragging : true,
      draggingInitPos : ev.screenX
    }
    this.setState(newState);
  }

  dragEnd() {
    var newState = {
        dragging : false
    }
    this.setState(newState);
  }

  handleImageLoaded(){
    var that = this;
    var currentLoaded = this.state.imagesLoadedCount + 1;
    this.setState({imagesLoadedCount : currentLoaded});
    if(currentLoaded === this.props.imagesList.length){//all images loaded
      setTimeout(function(){ //without this it does not get called when images are cached
        that.hidePreloader();
      },0)
    }
  }

  onDrag(ev) {
    if(this.state.dragging === true){
      let prevX;
      if(this.state.xPos){
       prevX = this.state.xPos;
      }
      this.state.xPos = ev.screenX;
      if(prevX < this.state.xPos ){
       this.rotateLeft();
      } else{
       this.rotateRight();
      }
    }
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
    const { children, showControls, inputValue, imagesList, sceneDimensions = {}, rotating} = this.props;
    let width = sceneDimensions.width || 800;
    let height = sceneDimensions.height || 500;
    var containerStyle = {
      width : width + "px",
      height: height + "px"
    }
    var styles = {
          transform: "scale("+this.state.zoomValue+")"
    }
    var that = this;
    
    return (
      <div className='viewer3dContainer' style={containerStyle}>
          <ul 
              style = {styles}
              onMouseMove={this.onDrag}
              onMouseDown={this.dragStart}
              onMouseUp={this.dragEnd}
              onDragExit={this.dragEnd}
              onDragEnd={this.dragEnd}
              onDragLeave={this.dragEnd}
              onMouseLeave={this.dragEnd}
              className='imagesList' 
              onLoad={this.renderView}>
              {imagesList.map((imageUrl, i)=>{
                  let className = (i === that.state.activeFrame) ? "active" : "not-active";
                  return <li key={i} className={className}>
                          <img 
                              className="imageFrame"
                              onLoad={that.handleImageLoaded.bind(that)}
                              src={imageUrl}/>
                          </li>;
              })}
          </ul>
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

Viewer3D_images.propTypes = {
  imagesList: PropTypes.array.isRequired,
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