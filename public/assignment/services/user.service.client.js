/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
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
            delete user.confirmPassword;
            for(var u in users) {
                if(user.username === users[u].username) {
                    return false;
                }
            }
            user._id = new Date().getTime().toString();
            users.push(user);
            return true;
        }

        function findUserById(userId) {
            for(var u in users) {
                var user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return undefined;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return undefined;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return undefined;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                var existingUser = users[u];
                if(existingUser._id === userId) {
                    users[u] = user;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for(var u in users) {
                var existingUser = users[u];
                if(existingUser._id === userId) {
                    users.splice(u,1);
                    return true;
                }
            }
            return false;
        }
    }
})();