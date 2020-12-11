class Terrain{
    constructor(vertices, colors){
        this.vertices = vertices;
        this.colors = colors;
        midPointRefinement( this.vertices, colors, 6);
    }
    
    applyHeight(url){
        //var canvas = document.createElement('canvas');
        var canvas = document.getElementById('canvas');
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function(){
            canvas.width = 256;
            canvas.height = 256;
            var context = canvas.getContext('2d');
            
            context.drawImage( img, 0, 0);
            
            var ctx = canvas.getContext('2d');
            var rgba = ctx.getImageData(0, 0, 256, 256).data;
            var v = vertices;
            for(var i=0; i<vertices.length; i+=3){
                //alert(vertices[i+2])
                var x = ((vertices[i]+1)/2)*256;
                var y = ((vertices[i+1]+1)/2)*256;
                //this.pointToPixel(vertices[i], vertices[i+1]);
                var idx = (y*256+x)*4;
                vertices[i+2] = (-1000 + ((rgba[idx] * 256 * 256 + rgba[idx+1] * 256 + rgba[idx+2]) * 0.1))/256*2-1;
                if(isNaN(vertices[i+2])) vertices[i+2] = 1;
                //this.calcHeight([rgba[idx],rgba[idx+1],rgba[idx+2]]);
            }
        }
        img.src = url;
    }

    pointToPixel(x, y){
        return [ ((x+1)/2)*256, ((y+1)/2)*256 ];
        //return [((x/256)*2)-1,((y/256)*2)-1]
    }

    calcHeight(rgba){
        return -10000 + ((rgba[0] * 256 * 256 + rgba[1] * 256 + rgba[2]) * 0.1);
    }
}