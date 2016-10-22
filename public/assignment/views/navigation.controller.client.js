/**
 * Created by prasadnm on 10/21/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .controller('NavigationController', NavigationController);

    function NavigationController($routeParams) {
        var vm = this;
        vm.toProfile        = toProfile();
        vm.toWebsitesOfUser = toWebsitesOfUser();
        vm.toNewWebsite     = toNewWebsite();
        vm.toEditWebsite    = toEditWebsite();
        vm.toPagesOfWebsite = toPagesOfWebsite();
        vm.toNewPage        = toNewPage();
        vm.toEditPage       = toEditPage();
        vm.toWidgetsOfPage  = toWidgetsOfPage();
        vm.toNewWidget      = toNewWidget();
        vm.toEditWidget     = toEditWidget();

        function toProfile() {
            var uid = $routeParams.uid;
            return '#/user/'+uid;
        }
        function toWebsitesOfUser() {
            var uid = $routeParams.uid;
            return '#/user/'+uid+'/website';
        }
        function toNewWebsite() {
            var uid = $routeParams.uid;
            return '#/user/'+uid+'/website/new';
        }
        function toEditWebsite(wid) {
            var uid = $routeParams.uid;
            return '#/user/'+uid+'/website/'+wid;
        }
        function toPagesOfWebsite(wid) {
            var uid = $routeParams.uid;
            return '#/user/'+uid+'/website/'+wid+'/page';
        }
        function toNewPage() {
            var uid = $routeParams.uid;
            var wid = $routeParams.wid;
            return '#/user/'+uid+'/website/'+wid+'/page/new';
        }
        function toEditPage(pid) {
            var uid = $routeParams.uid;
            var wid = $routeParams.wid;
            return '#/user/'+uid+'/website/'+wid+'/page/'+pid;
        }
        function toWidgetsOfPage(pid) {
            var uid = $routeParams.uid;
            var wid = $routeParams.wid;
            return '#/user/'+uid+'/website/'+wid+'/page/'+pid+'/widget';
        }
        function toNewWidget() {
            var uid = $routeParams.uid;
            var wid = $routeParams.wid;
            var pid = $routeParams.pid;
            return '#/user/'+uid+'/website/'+wid+'/page/'+pid+'/widget/new';
        }
        function toEditWidget(wgid) {
            var uid = $routeParams.uid;
            var wid = $routeParams.wid;
            var pid = $routeParams.pid;
            return '#/user/'+uid+'/website/'+wid+'/page/'+pid+'/widget/'+wgid;
        }
    }
})();