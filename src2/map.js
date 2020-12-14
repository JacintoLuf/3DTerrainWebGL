//var key = "pk.eyJ1IjoibHVmZiIsImEiOiJja2k0dXNsY3UyZWhuMnNsdDJ2Y2hxOGZsIn0.NBXBwoqeK4OT-Gtm4L_5QQ"
var init_url = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/';
var end_url = '.pngraw?access_token='+key;
var zoom = 0;
var tile = Math.pow(2,2*zoom);
var x_max = y_max = Math.floor(Math.pow(2,zoom)-1);
var x_pos = y_pos = 0;


function calc_tile(){
    tile = Math.pow(2,2*zoom);
}
function calc_pos(){
    x_pos = x_max/2;
    y_pos = y_max/2;
}

function map(){
    calc_tile(); calc_pos();
    console.log("zoom: "+String(zoom)+" tile:"+String(tile));
    m_url = init_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+end_url;
    sceneModels[0] = new terrain(m_url, meshDepth);
    sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;
}
function walk_map(x=0, y=0){
    x_pos += x;
    y_pos += y;
    console.log("zoom: "+String(zoom)+" tile:"+String(tile));
    m_url = init_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+end_url;
    sceneModels[0] = new terrain(m_url, meshDepth);
    sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.5;
}