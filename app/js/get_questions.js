/* jshint worker: true */
'use strict';

importScripts("questions-worker.js");

onmessage = function(e) {

 	var quizId = e.data.config.quizID;
 	var webServiceUrl = e.data.config.webServiceURL;
 	var url = webServiceUrl + quizId;

 	loadConfig(e.data);

 	if(quizId)
 	{
		getQuizQuestions(url, function(results) {

			loadAnnotations(results);

		});
 	}
}

function getQuizQuestions(url, callback) {
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		callback(JSON.parse(this.responseText));
	}
	xhr.open("GET", url, true)
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send();
}




