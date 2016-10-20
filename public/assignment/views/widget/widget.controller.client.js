/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websiteId = parseInt($routeParams.wid);
        vm.pageId = parseInt($routeParams.pid);
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        vm.safeCheckHTML = safeCheckHTML;
        vm.safeCheckYoutubeURL = safeCheckYoutubeURL;
        vm.safeCheckImageURL = safeCheckImageURL;

        function safeCheckHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function safeCheckYoutubeURL(url) {
            var parts = url.split('/');
            var id = parts[parts.length-1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function safeCheckImageURL(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websiteId = parseInt($routeParams.wid);
        vm.pageId = parseInt($routeParams.pid);
        vm.createWidget = createWidget;

        function createWidget(type) {
            vm.error = null;
            var newWgid;
            //TODO: remove this check once all widget types are implemented
            if(type!='HEADER' && type!='IMAGE' && type!='YOUTUBE' && type!='HTML') {
                vm.error = 'Functionality not available';
            }
            else {
                var widget = {};
                widget.widgetType = type;
                newWgid = WidgetService.createWidget(vm.pageId, widget);
                if(!newWgid) vm.error="Could not create widget";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWgid);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websiteId = parseInt($routeParams.wid);
        vm.pageId = parseInt($routeParams.pid);
        vm.widgetId = parseInt($routeParams.wgid);
        vm.widget = WidgetService.findWidgetById(vm.widgetId);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {
            if(!WidgetService.updateWidget(vm.widgetId,vm.widget)) {
                vm.error="Could not create new widget";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            if(!WidgetService.deleteWidget(vm.widgetId)) {
                vm.error="Could not delete this widget";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();