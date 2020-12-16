var sceneModels = [];
var map_url = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/';
var texture_url = 'https://api.mapbox.com/v4/mapbox.satellite/';
var key = "pk.eyJ1IjoibHVmZiIsImEiOiJja2k0dXNsY3UyZWhuMnNsdDJ2Y2hxOGZsIn0.NBXBwoqeK4OT-Gtm4L_5QQ";
var end_url = 'access_token='+key;
var zoom = 0;
var old_zoom = 0;
var tile = Math.pow(2,2*zoom);
var x_max = y_max = Math.floor(Math.pow(2,zoom)-1);
var x_pos = y_pos = 0;


function calc_tile(){
    tile = Math.pow(2,2*zoom);
}
function calc_pos(){
    x_max = y_max = Math.pow(2,zoom)-1;
    x_pos = Math.floor(x_max/2);
    y_pos = Math.floor(y_max/2);
}
function keep_tranformation(model){
	sceneModels[0].tx = model.tx;
	sceneModels[0].ty = model.ty;
	sceneModels[0].tz = model.tz;
	sceneModels[0].rotAngleXX = model.rotAngleXX;
	sceneModels[0].rotAngleYY = model.rotAngleYY;
	sceneModels[0].rotAngleZZ = model.rotAngleZZ;
	sceneModels[0].sx = model.sx;
	sceneModels[0].sy = model.sy;
	sceneModels[0].sz = model.sz;
	sceneModels[0].rotXXOn = model.rotXXOn;
	sceneModels[0].rotYYOn = model.rotYYOn;
	sceneModels[0].rotZZOn = model.rotZZOn;
	sceneModels[0].rotXXSpeed = model.rotXXSpeed;
	sceneModels[0].rotYYSpeed = model.rotYYSpeed;
	sceneModels[0].rotZZSpeed = model.rotZZSpeed;
	sceneModels[0].rotXXDir = model.rotXXDir;
	sceneModels[0].rotYYDir = model.rotYYDir;
	sceneModels[0].rotZZDir = model.rotZZDir;
}

function map(){
    var old_model;
    calc_tile(); calc_pos();
    try{
        if(sceneModels[0].vertices) old_model = sceneModels[0];
    }catch{}
    console.log("zoom:"+String(zoom)+" tile:"+String(tile)+" x:"+String(x_pos)+" y:"+String(y_pos));
    var m_url = map_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+'.pngraw?'+end_url;
    var t_url = texture_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+'.jpg80?'+end_url;
    sceneModels[0] = new terrain(m_url, t_url, meshDepth);
    if(old_model) keep_tranformation(old_model);
}
function walk_map(x=0, y=0){
    console.log("x:"+String(x)+" y:"+String(y)+" x:"+String(x_pos)+" y:"+String(y_pos));
    if(x_pos+x<0 || x_pos+x>x_max || y_pos+y<0 || y_pos+y>y_max ) return;
    x_pos += x;
    y_pos += y;
    console.log("zoom:"+String(zoom)+" tile:"+String(tile));
    var m_url = map_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+'.pngraw?'+end_url;
    var t_url = texture_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+'.jpg80?'+end_url;
    var old_model = sceneModels[0];
    sceneModels[0] = new terrain(m_url, t_url, meshDepth);
    keep_tranformation(old_model);
}