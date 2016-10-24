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
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage() {
            vm.error = null;
            if(!PageService.createPage(vm.websiteId, vm.page)) {
                vm.error = "Page with this name already exists"
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.pageId = $routeParams.pid;
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage() {
            vm.error = null;
            if(!PageService.updatePage(vm.pageId, vm.page)) {
                vm.error = "Could not update page";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            vm.error = null;
            if(!PageService.deletePage(vm.pageId)) {
                vm.error = "Could not delete page";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();