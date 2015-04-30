/**
 * Created by Volker on 28.04.2015.
 */
'use strict';

// Configuring the Pictures module
angular.module('contacts').run(['Menus',
    function(Menus) {
        // Add the Pictures dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Kontakt',
            isPublic: true,
            state: 'contact',
            position: 4
        });
    }
]);
