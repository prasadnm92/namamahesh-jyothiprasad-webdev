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
            console.log('in login');
            vm.error = null;
            if(!username || !password) vm.error="Enter username and password to login!";
            if(!vm.error) {
                var user = UserService.findUserByCredentials(username, password);
                if(!user) vm.error = "Username or Password does not match";
                else {
                    $location.url("/user/" + user._id);
                }
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            vm.error = null;
            console.log('in register');
            if(!user || !user.username) vm.error = "Enter a valid username";
            else if(!user || !user.password) vm.error = "Enter a password";
            else if(!user || (user.password !== user.confirmPassword)) vm.error = "Passwords don't match!";
            else if(UserService.createUser(user)) {
                var uid = UserService.findUserByUsername(user.username)._id;
                $location.url('/user/'+uid);
            }
            else vm.error = "Username already exists";
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;

        var user = UserService.findUserById(parseInt($routeParams.uid));
        if(user) {
            vm.user = user;
        }

        function updateProfile() {
            vm.success = null;
            vm.error = null;
            if(UserService.updateUser(parseInt($routeParams.uid), vm.user)) {
                vm.success = "Successfully Updated";
            }
            else vm.error = "Could not update";
        }
    }
})();