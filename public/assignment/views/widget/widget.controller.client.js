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
        vm.safeCheckHTML = safeCheckHTML;
        vm.safeCheckYoutubeURL = safeCheckYoutubeURL;
        vm.safeCheckImageURL = safeCheckImageURL;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function safeCheckHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function safeCheckYoutubeURL(url) {
            //change a full URL to youtube's embed URL format to use in iFrame
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
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
        }
        init();

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
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget() {
            vm.error = null;
            if(!WidgetService.updateWidget(vm.widgetId,vm.widget)) {
                vm.error="Could not create new widget";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            vm.error = null;
            if(!WidgetService.deleteWidget(vm.widgetId)) {
                vm.error="Could not delete this widget";
            }
            if(!vm.error) $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();