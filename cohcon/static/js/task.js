$(document).ready(function() {
	cohcon();
});

function cohcon() {

  	window.myscreen = initScreen();

	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html",
		"instructions/instruct-2.html",
		"instructions/instruct-ready.html"
	];

	window.task = [];
	task[0] = [];
	task[0][0] = initSurvey();
	task[0][0].html = "survey.html";

	task[0][1] = initInstructions(instructionPages);

	task[0][2] = {};
	task[0][2].waitForBacktick = 0;
	task[0][2].seglen = [0.5,0.25,3];
	task[0][2].numTrials = 5;
	task[0][2].parameter = {};
	task[0][2].parameter.practice = 1;
	task[0][2].parameter.cuedTask = 'contrast';
	task[0][2].parameter.miscuedTask = 'coherence';
	task[0][2].parameter.contrast = [.1, .5, .9];
	task[0][2].parameter.coherence = [.1, .2, .4];
	task[0][2].usingScreen = 1;
	task[0][2].html = "canvas.html";

	task[0][3] = initSurvey();
	task[0][3].html = "postsample.html";

	task[0][4] = initSurvey();
	task[0][4].html = "preExp.html";

	task[0][5] = {};
	task[0][5].seglen = [0.5,0.25,1];
	task[0][5].numTrials = 100;
	task[0][5].parameter = {};
	task[0][5].parameter.practice = 0;
	task[0][5].parameter.cuedTask = 'coherence';
	task[0][5].parameter.miscuedTask = 'contrast';
	task[0][5].parameter.contrast = [.1, .5, .9];
	task[0][5].parameter.coherence = [.1, .2, .4];
	task[0][5].usingScreen = 1;
	task[0][5].html = "canvas.html";

	task[0][6] = initSurvey();
	task[0][6].html = "postquestionnaire-1.html";

	task[0][7] = initSurvey();
	task[0][7].html = "postquestionnaire-2.html";


	task[0][2] = initTask(task[0][2], startSegmentCallback, screenUpdateCallback);
	task[0][5] = initTask(task[0][5], startSegmentCallback, screenUpdateCallback, undefined, startTrialCallback, endTrialCallback);

	window.stimulus = {};
	initStimulus('stimulus');

	myInitStimulus();

	initTurk();

	startPhase(task[0]);

}

var startTrialCallback = function(task, myscreen) {

  return [task, myscreen];
}

var endTrialCallback = function(task, myscreen) {

  return [task, myscreen];
}

var startSegmentCallback = function(task, myscreen) {

  return [task, myscreen];
}

var screenUpdateCallback = function(task, myscreen) {

	jglClearScreen(128);

	jglFixationCross(1,2,'#ff0000',[0,0]);

	//jglLines2([0], [15], [0], [-15], 0.02, "#00ff00");
	//jglPoints2(stimulus.dots.blue.x, stimulus.dots.blue.y, stimulus.dots.blue.r, stimulus.dots.blue.color);
	//jglPoints2(stimulus.dots.red.x, stimulus.dots.red.y, stimulus.dots.red.r, stimulus.dots.red.color);

	return [task, myscreen];

}

function myInitStimulus() {

	stimulus.low = {}; stimulus.med = {}; stimulus.high = {};
	stimulus.low.contrast = 0.1;
	stimulus.low.coherence = 0.1;
	stimulus.med.contrast = 0.5;
	stimulus.med.coherence = 0.25;
	stimulus.high.contrast = 0.9;
	stimulus.high.coherence = 0.4;

	stimulus.mask = {};
	stimulus.mask.x = {}; stimulus.mask.y = {};
	stimulus.mask.color = {};
	stimulus.mask.x.min = -10;
	stimulus.mask.x.max = 10;
	stimulus.mask.y.min = -8;
	stimulus.mask.y.max = 8;
	stimulus.mask.color.A = '#ffffff';
	stimulus.mask.color.B = '#111111';
	stimulus.mask.blocksize = 0.5;
	
	stimulus.dots = {};
	stimulus.dots.color = ['#ffffff','#111111'];
	stimulus.dots.n = 100;
	stimulus.dots.group = [zeros]
	stimulus.dots.x = [];
	stimulus.dots.y = [];
}

function genXArray(length) {
	var negs = lessThan(rand(task[0][0], length), 0.5);

	var values = add(multiply(rand(task[0][0], length), stimulus.dots.xrange - stimulus.dots.lineBuf), stimulus.dots.lineBuf);

	values = change(values, multiply(index(values, negs, true), -1), negs);

	return values;

}
