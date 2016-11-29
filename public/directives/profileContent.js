(function() {
    angular
        .module('MyProfile')
        .directive('profileContent', profileContent);

    function profileContent() {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {},
            templateUrl: '/directives/profileContent.html',
            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        element.append(clone);
                    });
                };
            }/*,
             controller: ProfileController,
             controllerAs: 'model'*/
        }
    }
})();