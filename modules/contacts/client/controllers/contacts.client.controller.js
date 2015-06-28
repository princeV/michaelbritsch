'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'Contacts',
    function ($scope, $stateParams, $http, $location, Authentication, Contacts) {
        $scope.authentication = Authentication;

        // define the form object - required to access the ng-if scope
        $scope.form = {
            name: '',
            subject: '',
            mailBody: ''
        };

        // Create new Contact
        $scope.create = function () {
            // Create new Contact object
            var contact = new Contacts({
                firstName: this.firstName,
                lastName: this.lastName,
                street: this.street,
                postalCode: this.postalCode,
                telephone: this.telephone,
                mobile: this.mobile,
                fax: this.fax,
                city: this.city,
                email: this.email
            });
            // Redirect after save
            contact.$save(function (response) {
                $location.path('/kontakt');
                // Clear form fields
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.street = '';
                $scope.postalCode = '';
                $scope.telephone = '';
                $scope.mobile = '';
                $scope.fax = '';
                $scope.city = '';
                $scope.email = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Contact
        $scope.remove = function (contact) {
            if (contact) {
                contact.$remove();
                for (var i in $scope.contacts) {
                    if ($scope.contacts [i] === contact) {
                        $scope.contacts.splice(i, 1);
                    }
                }
            } else {
                $scope.contact.$remove(function () {
                    $location.path('/');
                });
            }
        };

        // Update existing Contact
        $scope.update = function () {
            var contact = $scope.contact;
            contact.changed = new Date();

            contact.$update(function () {
                $location.path('kontakt');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find the first Biography
        $scope.findFirst = function () {
            $scope.contacts = Contacts.query(function (contactResults) {
                //set the first to be the active contact:
                $scope.contact = contactResults[0];
            });
        };

        // Find existing Contact
        $scope.findOne = function () {
            $scope.contact = Contacts.get({
                contactId: $stateParams.contactId
            });
        };
        $scope.mailSuccess = $scope.mailError = null;
        $scope.disableForm = false;

        $scope.initialiseContactForm = function () {
            // reset subject and body
            $scope.form = {
                name: '',
                subject: '',
                mailBody: ''
            };
            $scope.mailSuccess = $scope.mailError = null;
            $scope.disableForm = false;

        };

        $scope.askForContactMail = function () {
            $scope.success = $scope.error = null;

            // set the name of the sender
            var name = $scope.authentication.user.displayName || $scope.form.name;
            var email = $scope.authentication.user.email || 'n/a';

            // replaces the carriage returns with html <br /> and adds the user data to the mail body
            var mailBodyUser = $scope.form.mailBody.replace(new RegExp('\r?\n', 'g'), '<br />') +
                '<br />' +
                '<br />******************************************************' +
                '<br />Von: ' + name +
                '<br />Email: ' + email +
                '<br />******************************************************'
                ;

            var eMailMessage = {
                subject: $scope.form.subject,
                mailBody: mailBodyUser
            };

            $http.post('/api/contactform/send', eMailMessage).success(function (response) {
                // Show user success message and clear form
                if (response.error) {
                    $scope.mailError = response.message;
                    $scope.disableForm = true;
                }
                else {
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
