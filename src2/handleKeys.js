// Handling keyboard events

// Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {
	
	if (currentlyPressedKeys[33]) {
		
		// Page Up

		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 0.9; 

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[34]) {
		
		// Page Down
		
		// For every model
		
		for ( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].sx *= 1.1; 

			sceneModels[i].sz = sceneModels[i].sy = sceneModels[i].sx;
		}
		
	}
	if (currentlyPressedKeys[37]) {
		
		// Left cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotYYSpeed -= 0.25; 
		}

	}
	if (currentlyPressedKeys[39]) {
		
		// Right cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotYYSpeed += 0.25; 
		}

	}
	if (currentlyPressedKeys[38]) {
		
		// Up cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotXXSpeed -= 0.25; 
		}

	}
	if (currentlyPressedKeys[40]) {
		
		// Down cursor key
		
		// For every model
		
		for( var i = 0; i < sceneModels.length; i++ )
	    {
			sceneModels[i].rotXXSpeed += 0.25; 
		}

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
		sceneModels[i].rotYYSpeed = radians( 5.0 * deltaX );
	}

	var deltaY = newY - lastMouseY;
	
	// For every model
		
	for( var i = 0; i < sceneModels.length; i++ )
	{
		sceneModels[i].rotXXSpeed = radians( 5.0 * deltaY );
	}
    
    lastMouseX = newX
    
    lastMouseY = newY;
  }