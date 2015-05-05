/**
 * Created by Volker on 04.05.2015.
 */
'use strict';

angular.module('core').directive('vnFirstStrong', function($window) {
    return{
        restrict: 'E',
        scope: {
            inputText: '@'
        },
        template: '<h2><strong>{{firstChar}}</strong>{{remainingChars}}</h2>',
        link: function(scope, elem, attrs){

                scope.inputText = attrs.inputText;
                scope.firstChar = attrs.inputText.charAt(0);
                scope.remainingChars = attrs.inputText.substring(1);
            console.log(scope);

        }
    };
});
