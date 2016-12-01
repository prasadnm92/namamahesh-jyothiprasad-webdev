(function() {
    angular
        .module('MyProfile')
        .directive('technicalSkills', technicalSkills);

    function technicalSkills() {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {skill: '='},
            templateUrl: '/directives/technicalSkills.html',
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