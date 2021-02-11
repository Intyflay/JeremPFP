window.onload = function () {
    var canvas = document.getElementById("thejerem");
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,78,78);

    //default
    var img = new Image();
    img.addEventListener('load', function() {
        ctx.drawImage(img,0,0);
        document.getElementById("download").href = canvas.toDataURL();
      }, false);
    img.src = "jeremalpha.png";

    function hexToRgb(h){return['0x'+h[1]+h[2]|0,'0x'+h[3]+h[4]|0,'0x'+h[5]+h[6]|0]}
    function rgbToHex(r,g,b){return"#"+((1<<24)+(r<<16)+(g<<8)+ b).toString(16).slice(1);}
    
    var foregroundpicker = [255,255,255];
    var backgroundpicker = [0,0,0];
    

    document.getElementById("fore").addEventListener("input", function(event){
        foregroundpicker = (hexToRgb(event.target.value));
        renderjerem(foregroundpicker,backgroundpicker)
        document.getElementById("forewrapper").style.backgroundColor=event.target.value;
    }, false);

    document.getElementById("back").addEventListener("input", function(event){
        backgroundpicker = (hexToRgb(event.target.value));
        renderjerem(foregroundpicker,backgroundpicker)
        document.getElementById("backwrapper").style.backgroundColor=event.target.value;
    }, false);

    function renderjerem(fore, back) {
        ctx.clearRect(0,0,78,78)

        ctx.drawImage(img,0,0)

        //modify non tranparent pixels
        var imagedata = ctx.getImageData(0,0,78,78);
        var pixels = imagedata.data;
        var i;
        for (i=0; i < pixels.length; i+=4) {
            if (pixels[i+3] != 0) {
                pixels[i] = fore[0];
                pixels[i+1] = fore[1];
                pixels[i+2] = fore[2];
                pixels[i+3] = 255
            };
        };
        var pixels = new ImageData(pixels,78,78)
        ctx.putImageData(pixels,0,0)
        
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = rgbToHex(back[0],back[1],back[2]);
        ctx.fillRect(0,0,78,78);
        
        document.getElementById("download").href = canvas.toDataURL();
    };
}
