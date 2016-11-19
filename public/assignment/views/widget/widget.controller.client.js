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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function(widgets) {
                    vm.widgets = widgets;
                })
                .error(function(err) {

                });
        }
        init();

        function safeCheckHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function safeCheckYoutubeURL(url) {
            //change a full URL to youtube's embed URL format to use in iFrame
            var parts = url.split('/');
            var id = parts[parts.length-1];
            if(id.includes("watch")) id = id.split('=')[1];
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
            //TODO: remove this check once all widget types are implemented
            if(type!='HEADER' && type!='IMAGE' && type!='YOUTUBE' && type!='HTML' && type!='TEXT') {
                vm.error = 'Functionality not available';
            }
            else {
                var widget = {
                    widgetType : type
                };
                WidgetService
                    .createWidget(vm.pageId, widget)
                    .success(function(widget) {
                        if(widget) {
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                        }
                        else vm.error="Could not create widget";
                    })
                    .error(function(err) {

                    });
            }
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function(widget) {
                    vm.widget = widget;
                })
                .error(function(err) {

                });
        }
        init();

        function updateWidget() {
            vm.error = null;
            WidgetService
                .updateWidget(vm.widgetId,vm.widget)
                .success(function(widget) {
                    if(widget)
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    else vm.error="Could not create new widget";
                })
                .error(function(err) {

                });
        }

        function deleteWidget() {
            vm.error = null;
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function(status) {
                    if(status)
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    else vm.error="Could not delete this widget";
                })
                .error(function(err) {

                });
        }
    }
})();