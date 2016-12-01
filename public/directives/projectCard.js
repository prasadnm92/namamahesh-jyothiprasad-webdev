(function() {
    angular
        .module('MyProfile')
        .directive('projectCard', projectCard);

    function projectCard() {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {project: '='},
            templateUrl: '/directives/projectCard.html',
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