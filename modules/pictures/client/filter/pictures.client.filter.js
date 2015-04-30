/**
 * Created by Volker on 29.04.2015.
 */
'use strict';
//Inputs a number and outputs an array with that length.
//(3 | array) => [0,1,2]
angular.module('pictures').filter('array', function() {
    return function(arrayLength) {
        arrayLength = Math.ceil(arrayLength);
        var arr = new Array(arrayLength), i = 0;
        for (; i < arrayLength; i++) {
            arr[i] = i;
        }
        return arr;
    };
});
