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
        messageService.sendName(user.name);
    };

    messageService.receive().then(null, null, function (message) {
        if (message.indexOf("migrationComplete") > -1) {
            console.log(messageService.isConnected());
        }
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
    var listener = $q.defer();
    var connected = false;

    self.stompClient = {};

    var service = {}, socket = {
        client: null,
        stomp: null
    }, messageIds = [];

    service.connect = function () {
        if (!connected) {
            var socket = new SockJS('/hello');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                connected = true;
                stompClient.subscribe('/user/topic/greetings', function (greeting) {
                    //listener.notify(JSON.parse(greeting.body).content);
                    listener.notify(greeting.body);
                });
            });
        }
    };

    service.receive = function () {
        return listener.promise;
    };

    service.disconnect = function () {
        if (stompClient != null) {
            stompClient.disconnect();
            connected = false;
        }
        //setConnected(false);
        console.log("Disconnected");
    };

    service.isConnected = function () {
        return connected;
    };

    service.sendName = function (name) {
        stompClient.send("/app/hello", {}, JSON.stringify({'name': name}));
    };
    return service;
});