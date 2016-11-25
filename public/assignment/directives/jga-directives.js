/**
 * Created by prasadnm on 11/4/16.
 */
(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    axis    : 'y',
                    start   : function (event, ui) {
                        start = ($(ui.item).index());
                    },
                    stop    : function (event, ui) {
                        end = ($(ui.item).index());
                        scope.sortableController.sort(start, end);
                    }
                });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            var pageId = $routeParams.pid;
            WidgetService
                .sortWidget(pageId, start, end)
                .success(function() {
                    if(arguments[1]==200) {
                        //SUCCESS
                    }
                })
                .error(function(err) {

                });
        }
    }
})();
