/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            createPage          : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById        : findPageById,
            updatePage          : updatePage,
            deletePage          : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            for(var p in pages) {
                if(pages[p].websiteId===websiteId && pages[p].name===page.name) return false;
            }
            page._id = parseInt(new Date().getTime());
            page.websiteId = websiteId;
            pages.push(page);
            return true;
        }

        function findPageByWebsiteId(websiteId) {
            var currentWebsitePages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) currentWebsitePages.push(pages[p]);
            }
            return currentWebsitePages;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id===pageId) return pages[p];
            }
            return undefined;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id===pageId) {
                    page._id = pageId;
                    page.websiteId = pages[p].websiteId;
                    pages[p] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id===pageId) {
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
    }
})();