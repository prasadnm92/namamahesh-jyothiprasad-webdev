(function() {
    angular
        .module('MyProfile')
        .directive('workExSection', workExSection);

    function workExSection() {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {work: '='},
            templateUrl: '/directives/workExSection.html',
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