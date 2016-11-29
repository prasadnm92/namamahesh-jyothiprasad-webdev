(function() {
    angular
        .module('MyProfile')
        .directive('educationCard', educationCard);

    function educationCard() {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {education: '='},
            templateUrl: '/directives/educationCard.html',
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