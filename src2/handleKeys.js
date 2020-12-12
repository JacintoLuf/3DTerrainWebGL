// Handling keyboard events

// Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {
	
	if (currentlyPressedKeys[38]) {
		
		// Page Up

		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 0.9; 

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[40]) {
		
		// Page Down
		
		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 1.1; 

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[65]) {
		
		// Left cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].tx -= 0.005; 
		}

	}
	if (currentlyPressedKeys[68]) {
		
		// Right cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].tx += 0.005; 
		}

	}
	if (currentlyPressedKeys[87]) {
		
		// Up cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].ty += 0.005; 
		}

	}
	if (currentlyPressedKeys[83]) {
		
		// Down cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].ty -= 0.005; 
		}

	}
	// if (currentlyPressedKeys[82]) {
	// 	//r key to reset
	// 	sceneModels[0].tx = 0.0;
	// 	sceneModels[0].ty = 0.0;
	// 	sceneModels[0].tz = 0.0;	
	// 	sceneModels[0].rotAngleXX = 0.0;
	// 	sceneModels[0].rotAngleYY = 0.0;
	// 	sceneModels[0].rotAngleZZ = 0.0;
	// 	sceneModels[0].sx = 1.0;
	// 	sceneModels[0].sy = 1.0;
	// 	sceneModels[0].sz = 1.0;		
	// 	sceneModels[0].rotXXOn = true;
	// 	sceneModels[0].rotYYOn = true;
	// 	sceneModels[0].rotZZOn = true;
	// 	sceneModels[0].rotXXSpeed = 0.0;
	// 	sceneModels[0].rotYYSpeed = 0.0;
	// 	sceneModels[0].rotZZSpeed = 0.0;
	// 	sceneModels[0].rotXXDir = 1;
	// 	sceneModels[0].rotYYDir = 1;
	// 	sceneModels[0].rotZZDir = 1;
	// }
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
	}
    
    lastMouseX = newX
    
    lastMouseY = newY;
  }