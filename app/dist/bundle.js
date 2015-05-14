System.register("app", [], function() {
  "use strict";
  var __moduleName = "app";
  function require(path) {
    return $traceurRuntime.require("app", path);
  }
  var homeModule = System.get("modules/home/home").default;
  var Config = System.get("config").default;
  var appModule = angular.module("cheese", ["ui.router", homeModule.name]);
  appModule.config(Config);
  return {};
});

System.register("config", [], function() {
  "use strict";
  var __moduleName = "config";
  function require(path) {
    return $traceurRuntime.require("config", path);
  }
  var Config = function Config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state('home', {
      url: "/home",
      controller: "HomeCtrl as homeCtrl",
      templateUrl: "modules/home/home.html"
    }).state('details', {
      url: "/details",
      controller: "DetailsCtrl as detailsCtrl",
      templateUrl: "modules/home/details.html"
    });
  };
  ($traceurRuntime.createClass)(Config, {}, {});
  Config.$inject = ['$stateProvider', '$urlRouterProvider'];
  var $__default = Config;
  return {get default() {
      return $__default;
    }};
});

System.register("modules/home/home-controller", [], function() {
  "use strict";
  var __moduleName = "modules/home/home-controller";
  function require(path) {
    return $traceurRuntime.require("modules/home/home-controller", path);
  }
  var HomeController = function HomeController(HomeService) {
    this.HomeService = HomeService;
  };
  ($traceurRuntime.createClass)(HomeController, {sayHello: function() {
      var $__0 = this;
      this.HomeService.getGreeting(this.name).then((function(greeting) {
        return $__0.greeting = greeting;
      }));
    }}, {});
  HomeController.$inject = ['HomeService'];
  var $__default = HomeController;
  return {get default() {
      return $__default;
    }};
});

System.register("modules/home/home-service", [], function() {
  "use strict";
  var __moduleName = "modules/home/home-service";
  function require(path) {
    return $traceurRuntime.require("modules/home/home-service", path);
  }
  var HomeService = function HomeService($q) {
    this.$q = $q;
  };
  ($traceurRuntime.createClass)(HomeService, {getGreeting: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "Noname McDefault";
      return this.$q((function(resolve) {
        return resolve(("Hello, " + name + ".  Welcome to Angular in ES6!!"));
      }));
    }}, {});
  HomeService.$inject = ['$q'];
  var $__default = HomeService;
  return {get default() {
      return $__default;
    }};
});

System.register("modules/home/home", [], function() {
  "use strict";
  var __moduleName = "modules/home/home";
  function require(path) {
    return $traceurRuntime.require("modules/home/home", path);
  }
  var HomeController = System.get("modules/home/home-controller").default;
  var HomeService = System.get("modules/home/home-service").default;
  var homeModule = angular.module("Home", []);
  homeModule.controller("HomeCtrl", HomeController);
  homeModule.service("HomeService", HomeService);
  var $__default = homeModule;
  return {get default() {
      return $__default;
    }};
});
