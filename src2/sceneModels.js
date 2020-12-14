//////////////////////////////////////////////////////////////////////////////
//
//  For instantiating the scene models.
//
//  J. Madeira - November 2018
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Constructors
//


function emptyModelFeatures() {

	// EMPTY MODEL

	this.vertices = [];

	this.normals = [];

	this.colors = [];

	// Transformation parameters

	// Displacement vector
	
	this.tx = 0.0;
	
	this.ty = 0.0;
	
	this.tz = 0.0;	
	
	// Rotation angles	
	
	this.rotAngleXX = 15.0;
	
	this.rotAngleYY = 0.0;
	
	this.rotAngleZZ = 0.0;	

	// Scaling factors
	
	this.sx = 0.8;
	
	this.sy = 0.8;
	
	this.sz = 0.8;		
	
	// Animation controls
	
	this.rotXXOn = false;
	
	this.rotYYOn = false;
	
	this.rotZZOn = false;
	
	this.rotXXSpeed = 1.0;
	
	this.rotYYSpeed = 1.0;
	
	this.rotZZSpeed = 1.0;
	
	this.rotXXDir = 1;
	
	this.rotYYDir = 1;
	
	this.rotZZDir = 1;
	
	// Material features
	
	this.kAmbi = [ 0.2, 0.2, 0.2 ];
	
	this.kDiff = [ 0.7, 0.7, 0.7 ];

	this.kSpec = [ 0.7, 0.7, 0.7 ];

	this.nPhong = 100;
}


function simplePlane( ) {
	
	var plane = new emptyModelFeatures();
	
	plane.vertices = [
			-1,  0.0,  1,
			 1,  0.0,  1,
			 1,  0.0, -1,
			 1,  0.0, -1,
			-1,  0.0, -1,
			-1,  0.0,  1,
	];

	plane.colors = [
		 0.709803922, 0.729411765,  0.380392157,
		 0.447058824,  0.329411765,  0.156862745,
		 0.447058824,  0.329411765,  0.156862745,
		 0.48627451,  0.552941176,  0.298039216,
		 0.48627451,  0.552941176,  0.298039216,
		 0.48627451,  0.552941176,  0.298039216,
];

		//  0.48627451,  0.552941176,  0.298039216,
		//  0.709803922, 0.729411765,  0.380392157,
		//  0.447058824,  0.329411765,  0.156862745,

	computeVertexNormals( plane.vertices, plane.normals );

	return plane;
}


function planeModel( subdivisionDepth = 3 ) {
	
	var plane = new simplePlane();
	
	midPointRefinement( plane.vertices, plane.colors, subdivisionDepth );
	
	computeVertexNormals( plane.vertices, plane.normals );
	
	return plane;
}


function terrain(url, depth){
	var terrain = new planeModel( depth )

	var canvas = document.createElement('canvas');
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.onload = function(){
		canvas.width = 256;
		canvas.height = 256;
		var context = canvas.getContext('2d');
		context.drawImage(img, 0, 0);
		var ctx = canvas.getContext('2d');
		var max = 0;
		var min = 1;
		for(var i=0; i<terrain.vertices.length; i+=3){
			var x = ((terrain.vertices[i]+1)/2)*256;
			if(x==256) x = 255;
			var y = ((terrain.vertices[i+2]+1)/2)*256;
			if(y==256) y = 255;
			var rgba = ctx.getImageData(x, y, 1, 1).data;
			var height = (-1000 + ((rgba[0] * 256 * 256 + rgba[1] * 256 + rgba[2]) * 0.1))/14960-0.6015374331550802;
			terrain.vertices[i+1] = height;
			if(height>max) max = height;
			if(height<max) min = height;
		}
		for(var i=0; i<terrain.vertices.length; i+=3){
			terrain.vertices[i+1] = terrain.vertices[i+1]/max-min;
		}
		//console.log(terrain.vertices);
		computeVertexNormals( terrain.vertices, terrain.normals );
	}
	img.src = url;
	return terrain;
}

//  Instantiating scene models
//

var sceneModels = [];

// Model 1 --- Middle

sceneModels.push( new terrain( base_url2 + key, meshDepth ) );

sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;

// Model 2 --- Bottom Right

// sceneModels.push( new terrain( base_url4 + key, meshDepth ) );

// sceneModels[1].tx = 1.0; sceneModels[1].ty = 0.0;

// sceneModels[1].sx = sceneModels[1].sy = sceneModels[1].sz = 0.5;
