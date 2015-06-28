'use strict';

// Pictures controller
angular.module('pictures').controller('PicturesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pictures', '$http',
    function ($scope, $stateParams, $location, Authentication, Pictures, $http) {
        $scope.authentication = Authentication;
        $scope.sizes = [];


        $scope.setPictureIndex = function (index) {
            $scope.pictureIndex = index;
        };

        $scope.slick = {
            current: 0,
            init: function (index) {
                this.current = index;
            },
            goto: function (index) {
                this.current = index;
            },
            next: function (index) {
                this.current++;
            },
            prev: function (index) {
                this.current--;
            },
            onBeforeChange: function () {
            },
            onAfterChange: function () {
            }
        };


        // function that returns the source of the picture in the required size
        $scope.getSourceBySize = function (sizeLabel, picture) {
            for (var key in picture.sizes) {
                if (picture.sizes[key].label === sizeLabel) {
                    return picture.sizes[key].source;
                }
            }
        };

        // Remove existing Picture
        $scope.remove = function (picture) {
            if (picture) {
                picture.$remove();

                for (var i in $scope.pictures) {
                    if ($scope.pictures [i] === picture) {
                        $scope.pictures.splice(i, 1);
                    }
                }
            } else {
                $scope.picture.$remove(function () {
                    $location.path('pictures');
                });
            }
        };

        // Update existing Picture
        $scope.update = function () {
            var picture = $scope.picture;

            picture.$update(function () {
                $location.path('pictures/list');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Pictures
        $scope.find = function () {
            // use the callback to make sure slick init-onload=true with data="pictures" is working properly
            Pictures.query(function (pictureResults) {
                $scope.pictures = pictureResults;
            });
        };


        // Find existing Picture
        $scope.findOne = function () {
            $scope.picture = Pictures.get({
                pictureId: $stateParams.pictureId
            });
        };
    }
]);
