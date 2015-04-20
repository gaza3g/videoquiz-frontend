'use strict';

var videoQuizControllers = angular.module('videoQuizControllers', []);

videoQuizControllers.controller('QuizCtrl', ['$scope', '$sce', '$routeParams','$http', '$q', '$window',
	function($scope, $sce, $routeParams, $http, $q, $window) {

	    $scope.domainpath = $routeParams.domainpath;
	    $scope.instance = $routeParams.instance;
	    $scope.quizid = $routeParams.quizid; 
	    $scope.puid = $routeParams.puid;

	    $scope.headingTitle = 'Video Quiz';
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


		/* Retrieve Video URL */
		var reqVideoUrl = $http.get($scope.webServiceUrl  + $scope.quizid + '/video');

		/* 
			In future when we have more than just one requests, we can fill up the $q array
			below.
		*/
		$q.all([reqVideoUrl]).then(function(result) {
			var tmp = [];
			angular.forEach(result, function(response) {
				tmp.push(response.data);
			});
			return tmp;
		}).then(function(tmpResult) {
			/* 
				Now that we have the value for the video url, we'll then 
				assign it once we get it.
			*/
			console.log("videoUrl: " + tmpResult[0]);
			var videoUrl = tmpResult[0].replace("\"", "");
			videoUrl = videoUrl.replace("\"", "");
	    	$scope.config.sources = [{src: videoUrl, type: "video/mp4"}]
		}) 

	}
]);