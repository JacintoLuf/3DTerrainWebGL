//var key = "pk.eyJ1IjoibHVmZiIsImEiOiJja2k0dXNsY3UyZWhuMnNsdDJ2Y2hxOGZsIn0.NBXBwoqeK4OT-Gtm4L_5QQ"
var init_url = 'https://api.mapbox.com/v4/mapbox.terrain-rgb/';
var end_url = '.pngraw?access_token='+key;
var zoom = 0;
var tile = Math.pow(2,2*zoom);
var x_pos = y_pos = Math.floor(Math.pow(2,zoom)-1);

function calc_tile(){
    tile = Math.pow(2,2*zoom);
}
function calc_pos(){
    x_pos = y_pos = Math.floor(Math.pow(2,zoom)-1/2);
}


function map(){
    if(sceneModels[0].sx<1 && zoom>0){
        zoom--;
        calc_tile(); calc_pos();
        console.log("zoom: "+String(zoom)+" tile:"+String(tile));
        m_url = init_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+end_url;
        
        //sceneModels[0] = new terrain(m_url, meshDepth);
        //sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 1;
        //console.log(m_url);
    }
    else if(sceneModels[0].sx>1.5 && zoom<11){
        zoom++;
        calc_tile(); calc_pos();
        console.log("zoom: "+String(zoom)+" tile:"+String(tile));
        m_url = init_url+String(zoom)+'/'+String(x_pos)+'/'+String(y_pos)+end_url;
        //sceneModels[0] = new terrain(m_url, meshDepth);
        //sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 1;
        //console.log(m_url);
    }
}