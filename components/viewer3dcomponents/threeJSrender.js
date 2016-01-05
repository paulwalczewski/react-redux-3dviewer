
      var container, camera, scene, renderer, dirLight, hemiLight;
      var mixers = [];
      var targetRotationX = 0;

      var group;

      //rotation variables
      var targetRotationOnMouseDownX = 0;
       
      var targetRotationY = 0;
      var targetRotationOnMouseDownY = 0;
       
      var mouseX = 0;
      var mouseXOnMouseDown = 0;
       
      var mouseY = 0;
      var mouseYOnMouseDown = 0;
       
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
       
      var finalRotationY;

      //end rotation varialbes


      var clock;

      export function initRender(){
        init();
        animate();
      }
      

      function init() {
        clock = new THREE.Clock();
        container = document.getElementById( 'viewer3Dcontainer' );

        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
        camera.position.set( 0, 6, 250 ); //x / y / z
        camera.rotation.y = 0;
        console.log('camera.rotation=', camera.rotation);
        camera.rotation.x = -0.1;
        camera.rotation.z = 0;
        scene = new THREE.Scene();

        scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
        scene.fog.color.setHSL( 0.6, 0, 1 );

        /*
        controls = new THREE.TrackballControls( camera );

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.15;
        */

        // LIGHTS

        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHex( 0xffffff );
        hemiLight.groundColor.setHex( 0xffffff );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        //

        dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );
        scene.add( dirLight );

        dirLight.castShadow = true;

        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;

        var d = 50;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;

        // GROUND

        var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
        var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
        groundMat.color.setHex( 0x999999 );

        var ground = new THREE.Mesh( groundGeo, groundMat );
        ground.rotation.x = -Math.PI/2;
        ground.position.y = -33;
        scene.add( ground );

        ground.receiveShadow = true;

        // SKYDOME

        var vertexShader = document.getElementById( 'vertexShader' ).textContent;
        var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
        var uniforms = {
          topColor:    { type: "c", value: new THREE.Color( 0x515151 ) },
          bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
          offset:    { type: "f", value: 33 },
          exponent:  { type: "f", value: 0.6 }
        };
      //  uniforms.topColor.value.copy( hemiLight.color );

        scene.fog.color.copy( uniforms.bottomColor.value );

        var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
        var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

        var sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );

        // MODEL
        group = new THREE.Object3D();
        var loader = new THREE.JSONLoader();

        loader.load( "ear/erji-scene.json", function( geometry, materials ) {

          // var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
          // var mesh = new THREE.Mesh( geometry, material );


          var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );



          var s = 20.35;
          mesh.scale.set( s, s, s );
          mesh.position.y = 0;
          mesh.rotation.y = -1;

          mesh.castShadow = true;
          mesh.receiveShadow = true;
          group.add(mesh);
          scene.add( group );

          // var mixer = new THREE.AnimationMixer( mesh );
          // mixer.addAction( new THREE.AnimationAction( geometry.animations[ 0 ] ).warpToDuration( 1 ) );
          // mixers.push( mixer );

        } );

        // RENDERER

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.cullFace = THREE.CullFaceBack;

        // // STATS

        // stats = new Stats();
        // container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );
        document.addEventListener( 'keydown', onKeyDown, false );
        container.addEventListener( 'mousedown', onDocumentMouseDown, false );
        container.addEventListener( 'touchstart', onDocumentTouchStart, false );
        container.addEventListener( 'touchmove', onDocumentTouchMove, false );

      }


      function onDocumentMouseDown( event ) {
 
                event.preventDefault();
         
                container.addEventListener( 'mousemove', onDocumentMouseMove, false );
                container.addEventListener( 'mouseup', onDocumentMouseUp, false );
                container.addEventListener( 'mouseout', onDocumentMouseOut, false );
         
                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;
         
                mouseYOnMouseDown = event.clientY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;
 
        }
         
        function onDocumentMouseMove( event ) {
         
                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
         
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
                targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
         
        }
         
        function onDocumentMouseUp( event ) {
         
                container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
         
        }
         
        function onDocumentMouseOut( event ) {
         
               container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
               container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
               container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
         
        }
         
        function onDocumentTouchStart( event ) {
         
                if ( event.touches.length == 1 ) {
         
                        event.preventDefault();
         
                        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                        targetRotationOnMouseDownX = targetRotationX;
         
                        mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
                        targetRotationOnMouseDownY = targetRotationY;
         
                }
         
        }
         
        function onDocumentTouchMove( event ) {
         
                if ( event.touches.length == 1 ) {
         
                        event.preventDefault();
         
                        mouseX = event.touches[ 0 ].pageX - windowHalfX;
                        targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;
         
                        mouseY = event.touches[ 0 ].pageY - windowHalfY;
                        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;
         
                }
         
        }
      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function onKeyDown ( event ) {

        switch ( event.keyCode ) {

          case 72: // h

          hemiLight.visible = !hemiLight.visible;
          break;

          case 68: // d

          dirLight.visible = !dirLight.visible;
          break;

        }

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();
        // stats.update();

      }

      function render() {

        var delta = clock.getDelta();

        //controls.update();

        for ( var i = 0; i < mixers.length; i ++ ) {

          mixers[ i ].update( delta );

        }

        //horizontal rotation   
         group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;
     
         //vertical rotation 
         finalRotationY = (targetRotationY - group.rotation.x); 
    //     group.rotation.x += finalRotationY * 0.05;
     
    //     finalRotationY = (targetRotationY - group.rotation.x);  
        if (group.rotation.x  <= 1 && group.rotation.x >= -1 ) {
     
            group.rotation.x += finalRotationY * 0.1;
            }
         if (group.rotation.x  > 1 ) {
     
            group.rotation.x = 1
            }
     
         if (group.rotation.x  < -1 ) {
     
            group.rotation.x = -1
        }

        renderer.render( scene, camera );

      }