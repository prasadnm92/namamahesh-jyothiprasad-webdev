/**
 * Created by prasadnm on 11/4/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable); // wm-sortable

    function wamSortable() {
        console.log("Hello from Sortable");
    }
})();