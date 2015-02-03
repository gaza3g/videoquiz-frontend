'use strict';

var videoQuizControllers = angular.module('videoQuizControllers', []);

videoQuizControllers.controller('QuizCtrl', ['$scope', '$sce', '$routeParams',
	function($scope, $sce, $routeParams) {

		$scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
	      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
	      'Y', 'Z'];

	    $scope.genres = ['Mathematics', 'Science', 'History', 'Geography', 'English Language',
	      'Physics', 'Chemistry', 'Additional Mathematics', 'Biology', 'English Literature', 
	      'Design and Technology', 'Social Studies', 'Home Economics'];

	    $scope.quizid = $routeParams.quizid; 

	    $scope.headingTitle = 'Our Story in 1 Minute';


		$scope.config = {
			autoHide: false,
			autoHideTime: 3000,
			sources: [
				{src: $sce.trustAsResourceUrl("video.mp4"), type: "video/mp4"},
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
						url: "js/get_questions.js?" + $scope.quizid,
					},
					webService:{
						url: "http://videoquiz-service.azurewebsites.net/quiz/",
					},
					pollServer:{
						url: "http://127.0.0.1:5000/"
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
	}
]);