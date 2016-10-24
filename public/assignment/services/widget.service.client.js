/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            createWidget          : createWidget,
            findWidgetsByPageId   : findWidgetsByPageId,
            findWidgetById        : findWidgetById,
            updateWidget          : updateWidget,
            deleteWidget          : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widget.pageId = pageId;
                    widget._id = new Date().getTime().toString();
                    widgets.push(widget);
                    return widget._id;
                }
            }
            return undefined;
        }

        function findWidgetsByPageId(pageId) {
            var currentPageWidgets = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) currentPageWidgets.push(widgets[w]);
            }
            return currentPageWidgets;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) return widgets[w];
            }
            return undefined;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widget._id = widgets[w]._id;
                    widget.pageId = widgets[w].pageId;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }
})();