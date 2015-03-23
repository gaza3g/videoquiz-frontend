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
	    $scope.puid = $routeParams.puid;
	    $scope.headingTitle = 'Our Story in 1 Minute';

	    console.log("PUID:" + $scope.puid);
	    console.log("QuizID:" + $scope.quizid);


		$scope.config = {
			autoHide: false,
			autoHideTime: 3000,
			sources: [
				{src: $sce.trustAsResourceUrl("https://videoquizstorage.blob.core.windows.net/asset-9e59093c-8fb3-4f17-b798-570d5998514c/video.mp4?sv=2012-02-12&sr=c&si=2fb819f8-081b-487b-970d-c3d24c91b61b&sig=QMjiVj9H3MlyUACk0qi2HZuWUfiI4ADp7z5rXeQZ2Vw%3D&st=2015-02-11T03%3A39%3A44Z&se=2017-02-10T03%3A39%3A44Z"), type: "video/mp4"},
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
						url: "http://172.16.184.162/api/quiz/"
					},
					pollServer:{
						url: "http://172.16.184.162/api/quiz/response"
						// url: "http://127.0.0.1:5000/"
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