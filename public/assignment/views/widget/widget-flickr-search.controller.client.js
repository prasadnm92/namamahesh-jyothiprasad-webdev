/**
 * Created by prasadnm on 11/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.error=null;
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function(widget) {
                    vm.widget = widget;
                })
                .error(function(err) {

                });
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    //split the photos into rows with 3 photos each
                    var photos = [], eachRow = [];
                    for(var p in data.photos.photo) {
                        if(eachRow.length==3) {
                            photos.push(eachRow);
                            eachRow=[];
                        }
                        eachRow.push(data.photos.photo[p]);
                    }
                    vm.photos = photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function(widget) {
                    console.dir(widget);
                    if(widget)
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                    else vm.error="Could not upload image";
                })
                .error(function(err) {

                });
        }
    }
})();