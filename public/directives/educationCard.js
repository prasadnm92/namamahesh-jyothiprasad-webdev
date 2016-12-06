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
            },
            controller: educationCardController,
            controllerAs: 'educationCardController'
        }
    }

    function educationCardController($scope, $mdDialog) {

        $scope.showPrerenderedDialog = function(divContent) {
            console.log(divContent);
            $mdDialog.show(
                $mdDialog
                    .alert()
                    .clickOutsideToClose(true)
                    .contentElement(divContent)
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        };
    }
})();