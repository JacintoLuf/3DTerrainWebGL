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

	// Transformation parameters

	// Displacement vector
	
	this.tx = 0.0;
	
	this.ty = 0.0;
	
	this.tz = 0.0;	
	
	// Rotation angles	
	
	this.rotAngleXX = 0.0;
	
	this.rotAngleYY = 0.0;
	
	this.rotAngleZZ = 0.0;	

	// Scaling factors
	
	this.sx = 1.0;
	
	this.sy = 1.0;
	
	this.sz = 1.0;		
	
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

	computeVertexNormals( plane.vertices, plane.normals );

	return plane;
}


function planeModel( subdivisionDepth = 5 ) {
	
	var plane = new simplePlane();
	
	midPointRefinement( plane.vertices, subdivisionDepth );
	
	computeVertexNormals( plane.vertices, plane.normals );
	
	return plane;
}


function terrain(url){
	var terrain = new planeModel( 8 )

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
		var sum = 0;
		for(var i=0; i<terrain.vertices.length; i+=3){
			var x = ((terrain.vertices[i]+1)/2)*256;
			if(x==256) x = 255;
			var y = ((terrain.vertices[i+2]+1)/2)*256;
			if(y==256) y = 255;
			var rgba = ctx.getImageData(x, y, 1, 1).data;
			var height = (-1000 + ((rgba[0] * 256 * 256 + rgba[1] * 256 + rgba[2]) * 0.1))/14960-0.6015374331550802;
			terrain.vertices[i+1] = height;
			sum += height;
			if(height>max) max = height;
			if(height<max) min = height;
		}
		//console.log("max: "+String(max)+"\nmin: "+String(min)+"\n avg: "+String(sum/terrain.vertices.length));
		//console.log(terrain.vertices);
		computeVertexNormals( terrain.vertices, terrain.normals );
	}
	img.src = url;
	return terrain;
}

//  Instantiating scene models
//

var sceneModels = [];

sceneModels.push( new terrain( base_url3 + key ) );
// sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;
