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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                })
                .error(function(err) {

                });
        }
        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                })
                .error(function(err) {

                });
        }
        init();

        function createWebsite() {
            vm.error = null;
            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .success(function(website) {
                    if(website) $location.url("/user/"+vm.userId+"/website");
                    else vm.error = "Website with this name already exists";
                })
                .error(function(err) {

                });
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                })
                .error(function(err) {

                });
            vm.websiteId = $routeParams.wid;
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function(website) {
                    vm.website = website;
                })
                .error(function(err) {

                });
        }
        init();

        function updateWebsite() {
            vm.error = null;
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .success(function(website) {
                    if(website)
                        $location.url("/user/"+vm.userId+"/website");
                    else vm.error = "Could not update website";
                })
                .error(function(err) {

                });
        }

        function deleteWebsite() {
            vm.error = null;
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function(status) {
                    if(status) $location.url("/user/"+vm.userId+"/website");
                    else vm.error = "Could not delete website";
                })
                .error(function(err) {

                });
        }
    }
})();