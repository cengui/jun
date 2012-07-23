/**
    June.js
*/

;(function(doc, exports){
    
    function extend(a, b){
        for(var key in b){
            if( b.hasOwnProperty(key) ){
                a[key] = b[key]
            }
        }
        return a;
    };
    
    var June = {
        extend:extend,
    };
    
    
    
    window[exports] = June;
    
})(window, 'June')