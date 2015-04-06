'use strict';

var videoQuizControllers = angular.module('videoQuizControllers', []);

videoQuizControllers.controller('QuizCtrl', ['$scope', '$sce', '$routeParams','$http',
	function($scope, $sce, $routeParams, $http) {

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

	 //    $http.get($scope.webServiceUrl  + $scope.quizid + '/video').success(function(data) {

	 //    	$scope.videoUrl = data;


		// 	$scope.config = {
		// 		autoHide: false,
		// 		autoHideTime: 3000,
		// 		sources: [
		// 			{src: $sce.trustAsResourceUrl("http://uat.asknlearn.com/EdulearnNETUpload/dev/learningobject/File/0f41ece8-c444-6169-570d-0f4044dc1c14/Google_Goggles.mp4"), type: "video/mp4"},
		// 		],
		// 		theme: {
		// 			url: "videogular.css"
		// 		},
		// 		plugins: {
		// 			questions: {
		// 				theme: {
		// 					url: "css/quiz.css"
		// 				},
		// 				data:{
		// 					url: "bower_components/video-quiz/get_questions.js?" + $scope.quizid,
		// 				},
		// 				webService:{
		// 					url: $scope.webServiceUrl,
		// 				},
		// 				pollServer:{
		// 					url: $scope.pollServerUrl,
		// 				}
		// 			},
		// 			cuepoints: {
		// 				theme: {
		// 					url: "bower_components/videogular-cuepoints/cuepoints.css",
		// 				},
		// 			},
		// 			analytics: {
		// 				servers: [
		// 					"http://localhost:5001/"
		// 				]
		// 			}
		// 		}
		// 	};

		// });
// http://uat.asknlearn.com/EdulearnNETUpload/dev/learningobject/File/0f41ece8-c444-6169-570d-0f4044dc1c14/Google_Goggles.mp4

		$scope.config = {
			autoHide: false,
			autoHideTime: 3000,
			sources: [
				// {src: $sce.trustAsResourceUrl("http://uat.asknlearn.com/EdulearnNETUpload/dev/learningobject/File/0f41ece8-c444-6169-570d-0f4044dc1c14/Google_Goggles.mp4"), type: "video/mp4"},
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
	    // console.log("PUID:" + $scope.puid);
	    // console.log("QuizID:" + $scope.quizid);
	    // if( $scope.config.sources.length > 0)
		   //  console.log($scope.config.sources[0].src.toString());

	    $http.get($scope.webServiceUrl  + $scope.quizid + '/video').success(function(data) {
	    	$scope.config.sources = [{src: $sce.trustAsResourceUrl(data), type: "video/mp4"}];
	    	console.log("cool")
	    	if( $scope.config.sources.length > 0)
	    	{
			    console.log("lol " + $scope.config.sources[0].src.toString());
	    	}
	    });




	}
]);