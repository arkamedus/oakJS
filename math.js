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
    
    function getNormal(){
        return new Vector3(this.x/this.getMagnitude,this.y/this.getMagnitude,this.z/this.getMagnitude);
    };
    
    function vecNorm(a){
        var d = vecDist( a, [0,0,0]);//Math.max(a[0],a[1],a[2]);
        return [ (a[0])/d,(a[1])/d,(a[2])/d ];
    };
    
    this.getMagnitude = function () {  // Vector3.getMagnitude()
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    
    this.toScreen = function (a) {
        return new Vector2();   
    };
};

var BoundingBox = function (_mx, _my, _mw, _mh) {
    this.x = _mx;
    this.y = _my;
    this.w = _mw;
    this.h = _mh;
    
    this.isIntersecting = function (a) {
        return false;
    };
};

// PROJECTION

Projection = {
    set: function(from, to, up, fov, aspect) {
        dX = to[0] - from[0];
        dY = to[1] - from[1];
        dZ = to[2] - from[2];
        mm = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
        dX = dX / mm;
        dY = dY / mm;
        dZ = dZ / mm;
        uX = up[0];
        uY = up[1];
        uZ = up[2];
        mm = uX * dX + uY * dY + uZ * dZ;
        uX = uX - (mm * dX);
        uY = uY - (mm * dY);
        uZ = uZ - (mm * dZ);
        mm = Math.sqrt(uX * uX + uY * uY + uZ * uZ);
        uX = uX / mm;
        uY = uY / mm;
        uZ = uZ / mm;
        tFOV = Math.tan(fov * Math.PI / 360);
        uX = uX * tFOV;
        uY = uY * tFOV;
        uZ = uZ * tFOV;
        vX = uY * dZ - dY * uZ;
        vY = uZ * dX - dZ * uX;
        vZ = uX * dY - dX * uY;
        vX = vX * aspect;
        vY = vY * aspect;
        vZ = vZ * aspect;
    },
    toWorld: function(m, from) {
        var screenx, screeny, mX, mY, mZ;
        screenx = 2 * m[0] / RENDER.WIDTH - 1;
        screeny = 1 - 2 * m[1] / RENDER.HEIGHT;
        mX = dX + uX * screeny + vX * screenx;
        mY = dY + uY * screeny + vY * screenx;
        mZ = dZ + uZ * screeny + vZ * screenx;
        if (mZ != 0) {
            return [from[0] - from[2] * mX / mZ, from[1] - from[2] * mY / mZ, 0];
        } else {
            return [from[0] - from[2] * mX, from[1] - from[2] * mY, 0];
        }
    },
    toScreen: function(a, b) {
        var pX, pY, pZ, mm, x_2d, y_2d;
        pX = a[0] - b[0];
        pY = a[1] - b[1];
        pZ = a[2] - b[2];
        mm = pX * dX + pY * dY + pZ * dZ;
        
        if (mm > 0) {
            pX /= mm;
            pY /= mm;
            pZ /= mm;
            mm = (pX * vX + pY * vY + pZ * vZ) / Math.pow((RENDER.WIDTH / RENDER.HEIGHT) * tFOV, 2);
            x_2d = (mm + 1) / 2 * RENDER.WIDTH;
            mm = (pX * uX + pY * uY + pZ * uZ) / Math.pow(tFOV, 2);
            y_2d = (1 - mm) / 2 * RENDER.HEIGHT;
            return [x_2d, y_2d];
        } else {
            x_2d = 0;
            y_2d = -100;
            return [x_2d, y_2d];
        }
    }
}



