/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": 123, "name": "Facebook",    "developerId": 456 },
            { "_id": 234, "name": "Tweeter",     "developerId": 456 },
            { "_id": 456, "name": "Gizmodo",     "developerId": 456 },
            { "_id": 567, "name": "Tic Tac Toe", "developerId": 123 },
            { "_id": 678, "name": "Checkers",    "developerId": 123 },
            { "_id": 789, "name": "Chess",       "developerId": 234 }
        ];
        var api = {
            createWebsite       : createWebsite,
            findWebsitesByUser  : findWebsitesByUser,
            findWebsiteById     : findWebsiteById,
            updateWebsite       : updateWebsite,
            deleteWebsite       : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            for(var w in websites) {
                if(websites[w].developerId===userId && websites[w].name===website.name) {
                    return false;
                }
            }
            website._id = parseInt(new Date().getTime());
            website.developerId = userId;
            websites.push(website);
            return true;
        }

        function findWebsitesByUser(userId) {
            var currentUserWebsites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) currentUserWebsites.push(websites[w]);
            }
            return currentUserWebsites;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id===websiteId) {
                    return websites[w];
                }
            }
            return undefined;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id===websiteId) {
                    website._id = websites[w]._id;
                    websites[w] = website;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id===websiteId) {
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }
})();