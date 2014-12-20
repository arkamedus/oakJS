var Vector2 = function (_mx, _my) {
    "use strict";
    this.x = _mx;
    this.y = _my;
    
    this.add = function (a) { // Vector2.add(Vector2)
        this.x += a.x;
        this.y += a.y;
    };
    
    this.sub = function (a) { // Vector2.sub(Vector2)
        this.x -= a.x;
        this.y -= a.y;
    };
    
    this.rotateX = function (a) { // TODO UPDATE TO 'Z' Rotation
        var tempY = this.y;
        this.y = (this.y * Math.cos(a) - this.z * Math.sin(a));
        this.z = (tempY * Math.sin(a) + this.z * Math.cos(a));
    };
    
    this.getMagnitude = function () {  // Vector2.getMagnitude()
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    
};

var Vector3 = function (_mx, _my, _mz) {
    "use strict";
    this.x = _mx;
    this.y = _my;
    this.z = _mz;
    
    this.add = function (a) { // Vector3.add(Vector3)
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
    };
    
    this.sub = function (a) { // Vector3.sub(Vector3)
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
    };
    
    this.rotateX = function (a) { // Vector3.rotateX(radians)
        var tempY = this.y;
        this.y = (this.y * Math.cos(a) - this.z * Math.sin(a));
        this.z = (tempY * Math.sin(a) + this.z * Math.cos(a));
    };
    
    this.getMagnitude = function () {  // Vector3.getMagnitude()
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    
    this.toScreen = function (a) {
        return new Vector2();   
    }
};