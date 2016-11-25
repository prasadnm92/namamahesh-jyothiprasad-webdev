/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser              : createUser,
            findUserById            : findUserById,
            findUserByUsername      : findUserByUsername,
            findUserByCredentials   : findUserByCredentials,
            updateUser              : updateUser,
            deleteUser              : deleteUser
        };
        return api;

        function createUser(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user",user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(user) {
            return $http.put("/api/user/"+user._id, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }
    }
})();