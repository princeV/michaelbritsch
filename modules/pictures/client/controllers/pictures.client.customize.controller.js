/**
 * Created by Volker on 17.04.2015.
 */
'use strict';
angular.module('pictures').controller('CarouselDemoCtrl', ['$scope',
    function ($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        slides.push({
            image: 'https://farm8.staticflickr.com/7607/16474748204_139d8e8ea4_b.jpg',
            text: 'Essen'
        });
        slides.push({
            image: 'https://farm8.staticflickr.com/7596/16536150674_a24e63ea88_b.jpg',
            text: 'Boot'
        });
        slides.push({
            image: 'https://farm9.staticflickr.com/8707/17156945372_b2dc9e6f23_b.jpg',
            text: 'Lecker'
        });
        slides.push({
            image: 'https://farm8.staticflickr.com/7677/16971008340_c396b6bc5a_b.jpg',
            text: 'Frodo'
        });



    }
]);
