
var getRequestAnimationFrame = function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function ( callback ){
                window.setTimeout(enroute, 1 / 60 * 1000);
           };
};


