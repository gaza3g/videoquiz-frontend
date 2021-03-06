'use strict';

// Declare app level module which depends on views, and components

var videoQuizApp = angular.module('videoQuizApp', [
  'ngRoute',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'uk.ac.soton.ecs.videogular.plugins.questions',
  'uk.ac.soton.ecs.videogular.plugins.cuepoints',
  'uk.ac.soton.ecs.videogular.plugins.analytics',
  'angular-loading-bar',
  'videoQuizControllers'
]);

videoQuizApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/default.html'
			}).
			when('/:domainpath/:instance/:quizid/:puid/', {
				templateUrl: 'partials/quiz.html',
				controller: 'QuizCtrl'
			}).
			when('/:domainpath/:instance/:quizid/:puid/:hashtoken', {
				templateUrl: 'partials/quiz.html',
				controller: 'QuizCtrl'
			}).
			when('/:domainpath/:instance/:quizid/:puid/:hashtoken/:qmode', {
				templateUrl: 'partials/quiz.html',
				controller: 'QuizCtrl'
			}).
			when('/test', {
				templateUrl: 'partials/test-ws.html'
			}).
			otherwise({
				redirectTo: '/'
		})
	}
]);
