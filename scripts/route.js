myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'scripts/templates/todo.html',
        controller: 'TodoController',
    })
    $urlRouterProvider.otherwise('/')
});