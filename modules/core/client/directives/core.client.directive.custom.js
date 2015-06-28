/**
 * Created by Volker on 04.05.2015.
 */
'use strict';

angular.module('vnHelper', []).directive('vnFirstCharStrong', function ($window) {
    return {
        restrict: 'E',
        scope: {
            inputText: '@'
        },
        transclude: true,
        template: '<h2><strong>{{firstChar}}</strong>{{remainingChars}}</h2>' +
        '<ng-transclude></ng-transclude>',
        link: function (scope, elem, attrs) {
            // observe to get the value once its available
            attrs.$observe('inputText', function (value) {
                    if (value !== undefined) {
                        scope.firstChar = value.charAt(0);
                        scope.remainingChars = value.substring(1);
                    }
                }
            )
            ;
        }
    }
        ;
})
;
