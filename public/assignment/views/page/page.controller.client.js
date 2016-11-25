/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        PageService
            .findPageByWebsiteId(vm.websiteId)
            .success(function(pages) {
                vm.pages = pages;
            })
            .error(function(err) {

            });
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(pages) {
                    vm.pages = pages;
                })
                .error(function(err) {

                });
        }
        init();

        function createPage() {
            vm.error = null;
            PageService
                .createPage(vm.websiteId, vm.page)
                .success(function(page) {
                    if(page) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    else vm.error = "Page with this name already exists";
                })
                .error(function(err) {

                });
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(pages) {
                    vm.pages = pages;
                })
                .error(function(err) {

                });
            vm.pageId = $routeParams.pid;
            PageService
                .findPageById(vm.pageId)
                .success(function(page) {
                    vm.page = page;
                })
                .error(function(err) {

                });
        }
        init();

        function updatePage() {
            vm.error = null;
            PageService
                .updatePage(vm.pageId, vm.page)
                .success(function(page) {
                    if(page) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    else vm.error = "Could not update page";
                })
                .error(function(err) {

                });
        }

        function deletePage() {
            vm.error = null;
            PageService
                .deletePage(vm.pageId)
                .success(function(status) {
                    if(status) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    else vm.error = "Could not delete page";
                })
                .error(function(err) {

                });
        }
    }
})();