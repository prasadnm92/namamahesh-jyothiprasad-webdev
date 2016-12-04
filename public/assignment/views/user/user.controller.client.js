/**
 * Created by prasadnm on 10/15/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            vm.error = null;
            if(!username || !password) vm.error="Both Username and Password is required to login!";
            if(!vm.error) {
                UserService
                    .login(username, password)
                    .success(function(user) {
                        if(user) $location.url("/user/" + user._id);
                        else vm.error = "Username or Password does not match";
                    })
                    .error(function(err) {

                    });
            }
        }
    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            vm.error = null;
            if(!user || !user.username) vm.error = "Enter a valid username";
            else if(!user || !user.password) vm.error = "Enter a password";
            else if(!user || (user.password !== user.confirmPassword)) vm.error = "Passwords don't match!";
            else {
                UserService
                    .register(user)
                    .success(function(user) {
                        if(user) {
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        }
                        else vm.error = "Username already exists";
                    })
                    .error(function(err) {

                    });
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            vm.userId = $routeParams.uid;
            UserService
                .findUserById(vm.userId)
                .success(function(user) {
                    if(user) vm.user = user;
                })
                .error(function(err) {

                });
        }
        init();

        function updateProfile() {
            vm.success = null;
            vm.error = null;
            UserService
                .updateUser(vm.user)
                .success(function(user) {
                    if(user) vm.success = "Successfully Updated";
                    else vm.error = "Could not update";
                })
                .error(function(err) {

                });
        }

        function deleteUser() {
            vm.error = null;
            UserService
                .deleteUser(vm.userId)
                .success(function(status) {
                    if(status) $location.url("/login");
                    else vm.error = "Could not delete";
                })
                .error(function(err) {

                });
        }

        function logout() {
            UserService
                .logout()
                .success(function(status) {
                    if(status) $location.url("/login");
                })
                .error(function(err) {

                });
        }
    }
})();