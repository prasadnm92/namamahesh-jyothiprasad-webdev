/**
 * Created by prasadnm on 10/14/16.
 */
(function(){
    angular
        .module('MyProfile')
        .config(Config);

    function Config($routeProvider, $mdThemingProvider){
        /*$mdThemingProvider
            .theme('default')
            .primaryPalette('teal' ,{
                'default': '500',
                'hue-1': '50',
                'hue-2': '800',
                'hue-3': 'A400'
            })
            .accentPalette('orange', {
                'default' :'700'
            });*/
        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default' : '900'
            })
            .backgroundPalette('grey', {
                'default': '300'
            })
            .dark();

        $routeProvider
            .when("/profile",{
                templateUrl: "views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/profile"
            });
    }
})();