'use strict';

// Pictures controller
angular.module('pictures').controller('PicturesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pictures', '$http',
    function ($scope, $stateParams, $location, Authentication, Pictures, $http) {
        $scope.authentication = Authentication;
        $scope.picture = null;
        $scope.flickrPictureId = 0;
        $scope.flickrLink = '';
        $scope.flickrSuccess = true;

        $scope.fetchFlickrData = function () {
            //create a new pictures object:
            $scope.picture = new Pictures({
                name: this.name,
                description: this.description,
                sizes: []
            });

            //initialize variables:
            $scope.flickrSuccess = true;
            $scope.error = '';
            $scope.flickrSquareIsAvailable = false;
            $scope.flickrSmallIsAvailable = false;
            $scope.flickrMediumIsAvailable = false;
            $scope.flickrLargeIsAvailable = false;
            $scope.flickrOriginalIsAvailable = false;

            //check the flickr bbcode
            checkFlickrBBcode();

            var host = 'https://api.flickr.com';
            var path = '/services/rest/';
            var method = 'flickr.photos.getSizes';
            var apiKey = 'e52b35ac4e8f7389ec81840ff2497704';
            var id = $scope.flickrPictureId;
            var format = 'json&nojsoncallback=1';
            var fullUrl = host.concat(path, '?method=', method, '&api_key=', apiKey, '&photo_id=', id, '&format=', format);

            // Simple GET request example :
            $http.get(fullUrl).
                success(function (data, status) {
                    //console.log('http.get.success');
                    //console.log($scope.flickrSuccess);
                    if (data.stat === 'ok') {
                        var index = 0;
                        for (index = 0; index < data.sizes.size.length; index++) {
                            //add the required fields to the picture object
                            $scope.picture.sizes.push(
                                {
                                    label: data.sizes.size[index].label,
                                    source: data.sizes.size[index].source,
                                    width: data.sizes.size[index].width,
                                    height: data.sizes.size[index].height
                                }
                            );

                            //check for images and set them to $scope vars:
                            switch (data.sizes.size[index].label) {
                                case 'Square':
                                    $scope.flickrSquareSource = data.sizes.size[index].source;
                                    if ($scope.flickrSquareSource !== '') {
                                        $scope.flickrSquareIsAvailable = true;
                                    }
                                    break;
                                case 'Small':
                                    $scope.flickrSmallSource = data.sizes.size[index].source;
                                    if ($scope.flickrSmallSource !== '') {
                                        $scope.flickrSmallIsAvailable = true;
                                    }
                                    break;
                                case 'Medium 640':
                                    $scope.flickrMediumSource = data.sizes.size[index].source;
                                    if ($scope.flickrMediumSource !== '') {
                                        $scope.flickrMediumIsAvailable = true;
                                    }
                                    break;
                                case 'Large':
                                    $scope.flickrLargeSource = data.sizes.size[index].source;
                                    if ($scope.flickrLargeSource !== '') {
                                        $scope.flickrLargeIsAvailable = true;
                                    }
                                    break;
                                case 'Original':
                                    $scope.flickrOriginalSource = data.sizes.size[index].source;
                                    if ($scope.flickrOriginalSource !== '') {
                                        $scope.flickrOriginalIsAvailable = true;
                                    }
                                    break;
                            }
                        }
                        $scope.flickrSuccess = false;
                    }
                    else {
                        $scope.error = data.message || 'Request failed';
                    }
                    //update data and status:
                    data = null;
                    status = null;
                }).
                error(function (data, status) {
                    //console.log('http.get.error');
                    $scope.error = data || 'Request failed';
                });
        };

        var checkFlickrBBcode = function () {

            var flickrUrlId = $scope.flickrLink.replace('https://flic.kr/p/', '');

            var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
            var num = flickrUrlId.length;
            var decoded = 0;
            var multi = 1;
            for (var i = (num - 1); i >= 0; i--) {
                decoded = decoded + multi * alphabet.indexOf(flickrUrlId[i]);
                multi = multi * alphabet.length;
            }
            $scope.flickrPictureId = decoded;

        };

        // Create new Picture
        $scope.create = function () {
            // Create new Picture object
            var picture = $scope.picture;

            // Redirect after save
            picture.$save(function (response) {
                $location.path('pictures/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
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
                $location.path('pictures/' + picture._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Pictures
        $scope.find = function () {
            $scope.pictures = Pictures.query(initializeSlides);
        };

        var initializeSlides = function(pictureResults){
            var slides = $scope.slides = [];
            var i;
            var j;
            for (i = 0; i < $scope.pictures.length; i++) {
                for (j = 0; j < $scope.pictures[i].sizes.length; j++) {
                    var text = $scope.pictures[i].description;
                    if ($scope.pictures[i].sizes[j].label === 'Large') {
                        slides.push({
                            image: $scope.pictures[i].sizes[j].source,
                            text: text
                        });
                    }
                }
            }
        };


        // Find existing Picture
        $scope.findOne = function () {
            $scope.picture = Pictures.get({
                pictureId: $stateParams.pictureId
            });
        };
    }
]);
