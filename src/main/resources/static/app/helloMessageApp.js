angular.module("helloMessageApp", [
    "helloMessageApp.controllers",
    "helloMessageApp.directives",
    "helloMessageApp.filters",
    "helloMessageApp.services"
]);

angular.module("helloMessageApp.controllers", []).controller("messageCtrl", function ($scope, messageService) {
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;

    var user = {};
    messageService.connect();

    $scope.update = function (user) {
        console.log(user);
        console.log("Send Request.");
        messageService.sendName(user.name);
    };

    messageService.receive().then(null, null, function (message) {
        $scope.messages.push(message);
    });
});
angular.module("helloMessageApp.filters", []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

angular.module("helloMessageApp.directives", []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

angular.module("helloMessageApp.services", []).service("messageService", function ($q, $timeout) {
    var self = this;
    var messages = [];
    var listener = $q.defer();

    self.stompClient = {};

    var service = {}, socket = {
        client: null,
        stomp: null
    }, messageIds = [];

    service.connect = function () {
        var socket = new SockJS('/hello');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/user/topic/greetings', function (greeting) {
                //this.messages.push(JSON.parse(greeting.body).content);
                //listener.notify(JSON.parse(greeting.body).content);
                listener.notify(greeting.body);
            });
        });
    };

    service.receive = function () {
        return listener.promise;
    };

    service.disconnect = function () {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        //setConnected(false);
        console.log("Disconnected");
    };

    service.sendName = function (name) {
        // var name = document.getElementById('name').value;
        stompClient.send("/app/hello", {}, JSON.stringify({'name': name}));
    };
    return service;
});