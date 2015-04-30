'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
    function ($scope, $state, Authentication, Menus) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        // Check if the use is admin
        $scope.userIsAdmin = false;
        $scope.checkUserRoles = function () {
            var i;
            if ($scope.authentication.user !== '') {
                for (i = 0; i < $scope.authentication.user.roles.length; i++) {
                    if ($scope.authentication.user.roles[i] === 'admin') {
                        $scope.userIsAdmin = true;
                        return;
                    }
                }
            }
            else{
                $scope.userIsAdmin = false;
            }

        };

    }
])
;
