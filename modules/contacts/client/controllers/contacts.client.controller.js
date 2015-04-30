'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'Contacts',
    function ($scope, $stateParams, $http, $location, Authentication, Contacts) {
        $scope.authentication = Authentication;

        $scope.userName = '';
        $scope.subject = '';
        $scope.mailBody = '';
        $scope.mailSuccess = $scope.mailError = null;
        $scope.disableForm  = false;

        $scope.initialiseContactForm = function(){
            // reset subject and body
            $scope.userName = '';
            $scope.subject = '';
            $scope.mailBody = '';
            $scope.mailSuccess = $scope.mailError = null;
            $scope.disableForm = false;

        };

        $scope.askForContactMail = function () {
            $scope.success = $scope.error = null;

            // replaces the carriage returns with html <br /> and adds the user data to the mail body
            var mailBodyUser = $scope.mailBody.replace(new RegExp('\r?\n','g'), '<br />') +
                '<br /><br />Mail from: ' + $scope.authentication.user.displayName +
                '<br />Formname: ' + $scope.userName +
                '<br />Username: ' + $scope.authentication.user.username +
                '<br />Email: ' + $scope.authentication.user.email + ' ';

            var eMailMessage = {
                subject: $scope.subject,
                mailBody: mailBodyUser
            };

            $http.post('/api/contact', eMailMessage).success(function (response) {
                // Show user success message and clear form
                if(response.error){
                    $scope.mailError = response.message;
                    $scope.disableForm = true;
                }
                else{
                    $scope.mailSuccess = response.message;
                    $scope.disableForm = true;
                }
            }).error(function (response) {
                // Show user error message and clear form
                $scope.mailError = response.message;
                $scope.disableForm = true;
            });
        };
    }
]);
