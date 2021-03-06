/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            register                : register,
            findCurrentUser         : findCurrentUser,
            findUserById            : findUserById,
            findUserByUsername      : findUserByUsername,
            findUserByCredentials   : findUserByCredentials,
            updateUser              : updateUser,
            deleteUser              : deleteUser,
            login                   : login,
            checkLoggedIn           : checkLoggedIn,
            logout                  : logout
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function checkLoggedIn() {
            return $http.post("/api/checkLoggedIn");
        }

        function register(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register",user);
        }

        function findCurrentUser() {
            return $http.get("/api/user");
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