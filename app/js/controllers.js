'use strict';

var videoQuizControllers = angular.module('videoQuizControllers', []);

videoQuizControllers.controller('QuizCtrl', ['$scope', '$sce', '$routeParams','$http', '$q',
	function($scope, $sce, $routeParams, $http, $q) {

		$scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
	      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
	      'Y', 'Z'];

	    $scope.genres = ['Mathematics', 'Science', 'History', 'Geography', 'English Language',
	      'Physics', 'Chemistry', 'Additional Mathematics', 'Biology', 'English Literature', 
	      'Design and Technology', 'Social Studies', 'Home Economics'];

	    $scope.quizid = $routeParams.quizid; 
	    $scope.puid = $routeParams.puid;
	    $scope.videoUrl = '';

	    $scope.headingTitle = 'Our Story in 1 Minute';

	    $scope.webServiceUrl = "http://uat.asknlearn.com/api/quiz/";
	    $scope.pollServerUrl = "http://uat.asknlearn.com/dev/Webservice/Quiz/QZN_QuizWebService.asmx/QZN_SaveUserResponse";



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