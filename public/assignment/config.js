/**
 * Created by prasadnm on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();