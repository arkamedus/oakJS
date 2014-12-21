var Sprite = function (_im) {
    "use strict";
    this.frames = [_im];
    this.subimage = 0;
    
    this.addSubImage = function (a) { // Vector2.add(Vector2)
        this.frames.push(a);
    };
    
    this.getImage = function () {
        return this.frames[Math.floor(this.subimage)];
    };
    
};




