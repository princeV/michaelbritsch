/**
 * Created by Volker on 12.05.2015.
 */
'use strict';

angular.module('pictures').directive('picturePreview', ['$window', function ($window) {

    return {
        restrict: 'A',
        template: '<canvas/>',
        scope: {
            picturePreview: '='
        },
        link: function (scope, element, attributes) {

            var canvas = element.find('canvas')[0];
            var reader = new FileReader();

            function onLoadImage() {
                // get canvas context in 2d
                var ctx = canvas.getContext('2d');

                /*jshint validthis:true */
                var sourceImage = this;
                var imageHeight = sourceImage.height;
                var imageWidth = sourceImage.width;

                var maxTargetImageSize = calculateMaxImageSize(scope.picturePreview.width, scope.picturePreview.height, imageWidth, imageHeight);

                // set the canvas size for the upload image:
                canvas.width = maxTargetImageSize.width;
                canvas.height = maxTargetImageSize.height;

                // scale the picture with drawImage on client side:
                ctx.drawImage(sourceImage, 0, 0, imageWidth, imageHeight, 0, 0, maxTargetImageSize.width, maxTargetImageSize.height);


                // generate the blob data based on the image type:
                var mimeType = scope.picturePreview.file.type;
                var dataURL = canvas.toDataURL(mimeType);
                var dataURLHeader = 'data:' + mimeType + ';base64,';
                var data = atob(dataURL.substring(dataURLHeader.length)),
                    asArray = new Uint8Array(data.length);

                for (var i = 0, len = data.length; i < len; ++i) {
                    asArray[i] = data.charCodeAt(i);
                }

                var blob = new Blob([asArray.buffer], {type: mimeType});


                // calculate the maxImageSize for the preview canvas
                var maxPreviewImageSize = calculateMaxImageSize(scope.picturePreview.previewWidth, scope.picturePreview.previewHeight, imageWidth, imageHeight);

                // set the canvas size for the preview image:
                canvas.width = maxPreviewImageSize.width;
                canvas.height = maxPreviewImageSize.height;

                // scale the picture with drawImage on client side:
                ctx.drawImage(sourceImage, 0, 0, maxPreviewImageSize.width, maxPreviewImageSize.height);


                //make blob to file:
                blob.lastModifiedDate = new Date();
                blob.name = scope.picturePreview.file.name;

                scope.picturePreview.file = blob;

                // scale the picture with drawImage on client side:
                //ctx.drawImage(sourceImage, 0, 0, 150,150);

            }

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }


            reader.onload = onLoadFile;
            reader.readAsDataURL(scope.picturePreview.file);

            function calculateMaxImageSize(maxWidth, maxHeight, imageWidth, imageHeight) {
                var aspectRatio = maxHeight / maxWidth;
                var imgageAspectRatio = imageHeight / imageWidth;
                var targetwidth = maxWidth;
                var targetheight = maxHeight;

                if (aspectRatio < imgageAspectRatio) {
                    targetheight = targetwidth / imageWidth * imageHeight;
                }
                else {
                    targetwidth = targetheight / imageHeight * imageWidth;
                }

                var maxImageSize = {
                    width: targetwidth,
                    height: targetheight
                };

                return maxImageSize;
            }

        }
    };
}]);
