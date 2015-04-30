/**
 * Created by Volker on 28.04.2015.
 */
'use strict';

// Configuring the Pictures module
angular.module('impressums').run(['Menus',
    function(Menus) {
        // Add the Pictures dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Impressum',
            isPublic: true,
            state: 'impressum',
            position: 5
        });
    }
]);
