function setEventListeners( canvas ){

	// NEW ---Handling the mouse
	
	// From learningwebgl.com

    canvas.onmousedown = handleMouseDown;
    
    document.onmouseup = handleMouseUp;
    
    document.onmousemove = handleMouseMove;
    
    // NEW ---Handling the keyboard
	
	// From learningwebgl.com

    function handleKeyDown(event) {
		
        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {
		
        currentlyPressedKeys[event.keyCode] = false;
    }

	document.onkeydown = handleKeyDown;
    
    document.onkeyup = handleKeyUp;
	
    // Dropdown list
	
	var projection = document.getElementById("projection-selection");
	
	projection.addEventListener("click", function(){
				
		// Getting the selection
		
		var p = projection.selectedIndex;
				
		switch(p){
			
			case 0 : projectionType = 0;
				break;
			
			case 1 : projectionType = 1;
				break;
		}  	
	});      

	// Dropdown list
	
	var list = document.getElementById("rendering-mode-selection");
	
	list.addEventListener("click", function(){
				
		// Getting the selection
		
		var mode = list.selectedIndex;
				
		switch(mode){
			
			case 0 : primitiveType = gl.TRIANGLES;
				break;
			
			case 1 : primitiveType = gl.LINE_LOOP;
				break;
			
			case 2 : primitiveType = gl.POINTS;
				break;
		}
	});      

	// // Mesh mult

	// document.getElementById("rec-depth-sub-button").onclick = function(){

	// 	if(!(meshDepth<1)){
	// 		meshDepth -= 1;
	// 		walk_map();
	// 	}
	// };

    // document.getElementById("rec-depth-add-button").onclick = function(){

	// 	if(!(meshDepth>7)){
	// 		meshDepth += 1;
	// 		walk_map();
	// 	}
	// };

	document.getElementById("rec-depth-slider").onclick = function(){

		var slider = document.getElementById("rec-depth-slider");

		meshDepth = slider.value;

		walk_map();
	};

	document.getElementById("color-variation-slider").onclick = function(){

		var slider = document.getElementById("color-variation-slider");

		randomness = slider.value;

		walk_map();
	};

	// Light events

	document.getElementById("light-1").onclick = function(){

		console.log(!lightSources[0].isRotZZOn());

		if( !lightSources[0].isRotZZOn() ) 
		{
			lightSources.pop()

			lightSources.push( new LightSource() );

			lightSources[0].setPosition( 0.0, 1.0, 1.0, 0.0 );
					
			lightSources[0].setIntensity( 1.0, 1.0, 1.0 );
					
			lightSources[0].setAmbIntensity( 0.2, 0.0, 0.0 );
					
			lightSources[0].switchRotZZOn( );
					
			lightSources[0].setRotationSpeed( 0.6 );
		}

		else
		{

			lightSources.pop()

			lightSources.push( new LightSource() );

			lightSources[0].setPosition( -1.0, 1.0, 1.0, 0.0 );

			lightSources[0].setIntensity( 1.0, 1.0, 1.0 );

			lightSources[0].setAmbIntensity( 0.2, 0.0, 0.0 );
		}

	};

}