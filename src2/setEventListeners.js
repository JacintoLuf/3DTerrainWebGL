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

	// Mesh mult

	document.getElementById("rec-depth-sub-button").onclick = function(){

		if(!(meshDepth<1)){
			meshDepth -= 1;
		
			sceneModels[0] = new terrain( base_url2 + key, meshDepth )
		
			sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;
		}
	};

    document.getElementById("rec-depth-add-button").onclick = function(){

		if(!(meshDepth>7)){
			meshDepth += 1;
		
			sceneModels[0] = new terrain( base_url2 + key, meshDepth )
		
			sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;
		}
	};

	// Light events

	document.getElementById("light-1").onclick = function(){

		lightSources.pop()
		
        lightSources.push( new LightSource() );

		lightSources[0].setPosition( -1.0, 1.0, 1.0, 0.0 );

		lightSources[0].setIntensity( 1.0, 0.89, 0.52 );

		lightSources[0].setAmbIntensity( 0.2, 0.0, 0.0 );

		lightSources[0].switchRotYYOn();

		lightSources[0].setRotationSpeed( 1.0 );

	};

	document.getElementById("light-2").onclick = function(){

		lightSources.pop()
		
        lightSources.push( new LightSource() );

		lightSources[0].setPosition( -1.0, 1.0, 1.0, 0.0 );

		lightSources[0].setIntensity( 1.0, 0.0, 1.0 );

		lightSources[0].setAmbIntensity( 0.2, 0.0, 0.0 );

	};

	// Button events
	
	document.getElementById("XX-on-off-button").onclick = function(){
		
		// Switching on / off
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotXXOn ) {

				sceneModels[i].rotXXOn = false;
			}
			else {
				sceneModels[i].rotXXOn = true;
			}	
		}
	};

	document.getElementById("XX-direction-button").onclick = function(){
		
		// Switching the direction
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotXXDir == 1 ) {

				sceneModels[i].rotXXDir = -1;
			}
			else {
				sceneModels[i].rotXXDir = 1;
			}	
		}
	};      

	document.getElementById("XX-slower-button").onclick = function(){
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotXXSpeed *= 0.75; 
		}
	};      

	document.getElementById("XX-faster-button").onclick = function(){
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotXXSpeed *= 1.25; 
		}
	};      

	document.getElementById("YY-on-off-button").onclick = function(){
		
		// Switching on / off
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotYYOn ) {

				sceneModels[i].rotYYOn = false;
			}
			else {
				sceneModels[i].rotYYOn = true;
			}	
		}
	};

	document.getElementById("YY-direction-button").onclick = function(){
		
		// Switching the direction
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotYYDir == 1 ) {

				sceneModels[i].rotYYDir = -1;
			}
			else {
				sceneModels[i].rotYYDir = 1;
			}	
		}
	};      

	document.getElementById("YY-slower-button").onclick = function(){

		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotYYSpeed *= 0.75; 
		}
	};      

	document.getElementById("YY-faster-button").onclick = function(){
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotYYSpeed *= 1.25; 
		}
	};      

	document.getElementById("ZZ-on-off-button").onclick = function(){
		
		// Switching on / off
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotZZOn ) {

				sceneModels[i].rotZZOn = false;
			}
			else {
				sceneModels[i].rotZZOn = true;
			}	
		}
	};

	document.getElementById("ZZ-direction-button").onclick = function(){
		
		// Switching the direction
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			if( sceneModels[i].rotZZDir == 1 ) {

				sceneModels[i].rotZZDir = -1;
			}
			else {
				sceneModels[i].rotZZDir = 1;
			}	
		}
	};      

	document.getElementById("ZZ-slower-button").onclick = function(){
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotZZSpeed *= 0.75; 
		}
	};      

	document.getElementById("ZZ-faster-button").onclick = function(){
		
		// For every model
		
		for(var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotZZSpeed *= 1.25; 
		}
	};      
}