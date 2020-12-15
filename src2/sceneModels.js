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

// global variables

var max = 0;
var min = 100000;
var rgb = [];

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
	
	this.kAmbi = [ 0.16, 0.10, 0.02 ];
	
	this.kDiff = [ 0.5, 0.5, 0.5 ];

	this.kSpec = [ 0.4, 0.4, 0.4 ];

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
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
		//  0.709803922, 0.729411765,  0.380392157,
		//  0.447058824,  0.329411765,  0.156862745,
		//  0.447058824,  0.329411765,  0.156862745,
		//  0.48627451,  0.552941176,  0.298039216,
		//  0.48627451,  0.552941176,  0.298039216,
		//  0.48627451,  0.552941176,  0.298039216,
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
		for(var i=0; i<terrain.vertices.length; i+=3){
			var x = ((terrain.vertices[i]+1)/2)*256;
			if(x==256) x = 255;
			var y = ((terrain.vertices[i+2]+1)/2)*256;
			if(y==256) y = 255;
			var rgba = ctx.getImageData(x, y, 1, 1).data;
			var height = (-1000 + ((rgba[0] * 256 * 256 + rgba[1] * 256 + rgba[2]) * 0.1));
			terrain.vertices[i+1] = height;
			rgb = colorMap(height);
			terrain.colors[i] = rgb[0];
			terrain.colors[i+1] = rgb[1];
			terrain.colors[i+2] = rgb[2];
			if(height>max) max = height;
			if(height<min) min = height;
		}
		var diff = max-min;
		for(var i=0; i<terrain.vertices.length; i+=3){
			terrain.vertices[i+1] = (terrain.vertices[i+1]-min)/diff;
		}
		console.log(min);
		console.log(max);
		computeVertexNormals( terrain.vertices, terrain.normals );
	}
	img.src = url;
	return terrain;
}

function colorMap( height ) {
	var levelDiff = ( max - min ) / 5;
	var waterLevel = ( max - min ) / 15;

    if ( height >= min && height < ( min + waterLevel ) ) {
		rgb[0] = 182/255 + randomColorVariation( 8 );
		rgb[1] = 227/255 + randomColorVariation( 8 );
		rgb[2] = 219/255 + randomColorVariation( 8 );
	}
	if ( height >= ( min + waterLevel ) && height < ( min + 2*levelDiff ) ) {
		rgb[0] = 181/255 + randomColorVariation( 6 );
		rgb[1] = 186/255 + randomColorVariation( 6 );
		rgb[2] = 97/255 + randomColorVariation( 6 );
	}
	if ( height >= ( min + 2*levelDiff ) && height < ( min + 3*levelDiff ) ) {
		rgb[0] = 124/255 + randomColorVariation( 6 );
		rgb[1] = 141/255 + randomColorVariation( 6 );
		rgb[2] = 76/255 + randomColorVariation( 6 );
	}
	if ( height >= ( min + 3*levelDiff ) && ( min + 4*levelDiff ) ) {
		rgb[0] = 114/255 + randomColorVariation( 9 );
		rgb[1] = 84/255 + randomColorVariation( 9 );
		rgb[2] = 40/255 + randomColorVariation( 9 );
	}
	if ( height >= ( min + 4*levelDiff ) && height < max ) {
		rgb[0] = 229/255 + randomColorVariation( 9 );;
		rgb[1] = 217/255 + randomColorVariation( 9 );;
		rgb[2] = 219/255 + randomColorVariation( 9 );;
	}

	return rgb;
}

function randomColorVariation( randomness ) {
	return Math.random() / randomness;
  }

//  Instantiating scene models
//

var sceneModels = [];

// Model 1 --- Middle

sceneModels.push( new terrain( inUseURL + key, meshDepth ) );

sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;