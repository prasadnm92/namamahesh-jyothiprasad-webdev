/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = "83efdb96ef7a5e7ef9ce9096e353bd37";
        var secret = "8f49d6b2d014c376";
        var urlBase = "https://api.flickr.com/services/rest/?" +
            "method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos    : searchPhotos
        };
        return api;

        function searchPhotos(searchText) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();