/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite() {
            vm.error = null;
            if(!WebsiteService.createWebsite(vm.userId, vm.website)) {
                vm.error = "Website with this name already exists";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.websiteId = $routeParams.wid;
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite() {
            vm.error = null;
            if(!WebsiteService.updateWebsite(vm.websiteId, vm.website)) {
                vm.error = "Could not update website";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite() {
            vm.error = null;
            if(!WebsiteService.deleteWebsite(vm.websiteId)) {
                vm.error = "Could not delete website";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website");
        }
    }
})();