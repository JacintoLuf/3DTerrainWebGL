// Handling keyboard events

// Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {
	
	if (currentlyPressedKeys[33]) {
		
		// Page Up

		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 1.05;

			console.log(sceneModels[i].sx);

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[34]) {
		
		// Page Down
		
		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 0.95;

			console.log(sceneModels[i].sx);

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[37]) {
		
		// Left cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].tx += sceneModels[i].sx*0.005; 
		}

	}
	if (currentlyPressedKeys[39]) {
		
		// Right cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].tx -= sceneModels[i].sx*0.005; 
		}

	}
	if (currentlyPressedKeys[38]) {
		
		// Up cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].ty -= sceneModels[i].sx*0.005;
		}

	}
	if (currentlyPressedKeys[40]) {
		
		// Down cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].ty += sceneModels[i].sx*0.005;
		}

	}
	if (currentlyPressedKeys[82]) {
		//r key to reset
		sceneModels[0].tx = 0.0;
		sceneModels[0].ty = 0.0;
		sceneModels[0].tz = 0.0;	
		sceneModels[0].rotAngleXX = 30.0;
		sceneModels[0].rotAngleYY = 0.0;
		sceneModels[0].rotAngleZZ = 0.0;
		sceneModels[0].sx = 0.8;
		sceneModels[0].sy = 0.8;
		sceneModels[0].sz = 0.8;		
		sceneModels[0].rotXXOn = false;
		sceneModels[0].rotYYOn = false;
		sceneModels[0].rotZZOn = false;
		sceneModels[0].rotXXSpeed = 1.0;
		sceneModels[0].rotYYSpeed = 1.0;
		sceneModels[0].rotZZSpeed = 1.0;
		sceneModels[0].rotXXDir = 1;
		sceneModels[0].rotYYDir = 1;
		sceneModels[0].rotZZDir = 1;
	}
}

//----------------------------------------------------------------------------

// Handling mouse events

// Adapted from www.learningwebgl.com

var mouseDown = false;

var lastMouseX = null;

var lastMouseY = null;

function handleMouseDown(event) {
	
    mouseDown = true;
  
    lastMouseX = event.clientX;
  
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {

    mouseDown = false;
}

function handleMouseMove(event) {

    if (!mouseDown) {
	  
      return;
    } 
  
    // Rotation angles proportional to cursor displacement
    
    var newX = event.clientX;
  
    var newY = event.clientY;

    var deltaX = newX - lastMouseX;
	
	// For every model
		
	for( var i = 0; i < sceneModels.length; i++ )
	{ 
		sceneModels[i].rotAngleYY += radians( 5.0 * deltaX );
	}

	var deltaY = newY - lastMouseY;
	
	// For every model
		
	for( var i = 0; i < sceneModels.length; i++ )
	{
		sceneModels[i].rotAngleXX += radians( 5.0 * deltaY );

		if ( sceneModels[i].rotAngleXX > 90.0 ) 
		{
			sceneModels[i].rotAngleXX = 90.0
		}
		if ( sceneModels[i].rotAngleXX < 0.0 ) 
		{
			sceneModels[i].rotAngleXX = 0.0
		}
			
	}
    
    lastMouseX = newX
    
    lastMouseY = newY;
  }