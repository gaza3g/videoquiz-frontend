'use strict';

var videoQuizControllers = angular.module('videoQuizControllers', []);

videoQuizControllers.controller('QuizCtrl', ['$scope', '$sce', '$routeParams','$http', '$q', '$window',
	function($scope, $sce, $routeParams, $http, $q, $window) {

	    $scope.domainpath = $routeParams.domainpath;
	    $scope.instance = $routeParams.instance;
	    $scope.quizid = $routeParams.quizid; 
	    $scope.puid = $routeParams.puid;

	    $scope.headingTitle = '';
	    $scope.webServiceUrl = 'http://' + $scope.domainpath + '/api/' + $scope.instance + '/quiz/';
	    $scope.pollServerUrl = 'http://' + $scope.domainpath + '/' + $scope.instance + '/Webservice/Quiz/QZN_QuizWebService.asmx/QZN_SaveUserResponse';

	    $scope.videoUrl = '';

	    $scope.SubmitQuiz = function() {
	    	var submitUrl = 'http://' + $scope.domainpath + '/' + $scope.instance + '/Quiz/QZN_QuizSubmit.aspx?qid=' + $scope.quizid + '&mode=&p=&hidetopmenu=true';
	    	$window.location.href = submitUrl;

	    }

		$scope.config = {
			autoHide: false,
			autoHideTime: 3000,
			puid: $scope.puid,
			sources: [
			],
			theme: {
				url: "videogular.css"
			},
			plugins: {
				questions: {
					theme: {
						url: "css/quiz.css"
					},
					data:{
						url: "bower_components/video-quiz/get_questions.js?" + $scope.quizid,
					},
					webService:{
						url: $scope.webServiceUrl,
					},
					pollServer:{
						url: $scope.pollServerUrl,
					}
				},
				cuepoints: {
					theme: {
						url: "bower_components/videogular-cuepoints/cuepoints.css",
					},
				},
				analytics: {
					servers: [
						"http://localhost:5001/"
					]
				}
			}
		};

		$scope.$on('cfpLoadingBar:started', function(event, data) {
			$scope.loading = "Loading quiz data. Please wait..."
		});

		$scope.$on('cfpLoadingBar:completed', function(event, data) {
			$scope.loading = '';
			$scope.loaded = "Quiz data has been loaded. Press Play ► to begin.";
		});


		/* Retrieve Video URL */
		var reqVideoUrl = $http.get($scope.webServiceUrl  + $scope.quizid + '/video');
		var reqQuizTitle = $http.get($scope.webServiceUrl  + $scope.quizid + '/title');

		$q.all([reqVideoUrl, reqQuizTitle]).then(function(result) {
			var tmp = [];
			angular.forEach(result, function(response) {
				tmp.push(response.data);
			});
			return tmp;
		}).then(function(tmpResult) {
			/* 
				Assign to scope once we have retrieved both
				video url and quiz title.
			*/
	    	$scope.config.sources = [{src: tmpResult[0], type: "video/mp4"}]

	    	$scope.headingTitle = tmpResult[1];

		}) 

	}
]);