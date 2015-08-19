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
	task[0][2].segmin = [0.5,0.05,0.5,3];
	task[0][2].segmax = [0.5,0.2,0.5,3];
	task[0][2].numTrials = 5;
	task[0][2].parameter = {};
	task[0][2].parameter.practice = 1;
	task[0][2].parameter.conP = 0.6;
	task[0][2].parameter.conInc = [0.1];
	task[0][2].parameter.conSide = [1, 2];
	task[0][2].parameter.cohP = [0.1];
	task[0][2].parameter.cohInc = [0.3];
	task[0][2].parameter.cohSide = [1, 2];
	task[0][2].parameter.task = 2;
	task[0][2].usingScreen = 1;
	task[0][2].getResponse = [0,0,0,1];
	task[0][2].html = "canvas.html";

	task[0][3] = initSurvey();
	task[0][3].html = "response.html";

	task[0][4] = initSurvey();
	task[0][4].html = "preExp.html";

	task[0][5] = {};
	task[0][5].segmin = [0.5,0.05,0.5,3];
	task[0][5].segmax = [0.5,0.2,0.5,3];
	task[0][5].numTrials = 100;
	task[0][5].parameter = {};
	task[0][5].parameter.practice = 0;
	task[0][5].parameter.practice = 1;
	task[0][5].parameter.conP = 0.6;
	task[0][5].parameter.conInc = [0.1];
	task[0][5].parameter.conSide = [1, 2];
	task[0][5].parameter.cohP = [0.1];
	task[0][5].parameter.cohInc = [0.3];
	task[0][5].parameter.cohSide = [1, 2];
	task[0][5].usingScreen = 1;
	task[0][5].getResponse = [0,0,0,1];
	task[0][5].html = "canvas.html";

	task[0][6] = initSurvey();
	task[0][6].html = "postquestionnaire-1.html";

	task[0][7] = initSurvey();
	task[0][7].html = "postquestionnaire-2.html";


	task[0][2] = initTask(task[0][2], startSegmentCallback, screenUpdateCallback, [], startTrialCallback);
	task[0][5] = initTask(task[0][5], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback, endTrialCallback);

	window.stimulus = {};
	initStimulus('stimulus');

	myInitStimulus(task);

	initTurk();

	startPhase(task[0]);

}

var startTrialCallback = function(task, myscreen) {
	// contrast
	var lCon, rCon;
	if (task.thistrial.conSide==1) {
		lCon = task.thistrial.conInc;
		rCon = 0;
	} else {

		rCon = task.thistrial.conInc;
		lCon = 0;
	}

	// convert to hex color
	stimulus.dots.lWhite = con2hex(task.thistrial.conP + lCon);
	stimulus.dots.lBlack = con2hex((1-task.thistrial.conP) - lCon);
	stimulus.dots.rWhite = con2hex(task.thistrial.conP + rCon);
	stimulus.dots.rBlack = con2hex((1-task.thistrial.conP) - rCon);

	// coherence

	if (task.thistrial.cohSide==1) {
		stimulus.dotsL.coherence = task.thistrial.cohP+task.thistrial.cohInc;
		stimulus.dotsR.coherence = task.thistrial.cohP;
	} else {
		stimulus.dotsR.coherence = task.thistrial.cohP+task.thistrial.cohInc;
		stimulus.dotsL.coherence = task.thistrial.cohP;
	}

	// update coherence
	upDotCoherence();

  return [task, myscreen];
}

var endTrialCallback = function(task, myscreen) {

  return [task, myscreen];
}

var getResponseCallback = function(task, myscreen) {
	return [task, myscreen];
}

var startSegmentCallback = function(task, myscreen) {

  return [task, myscreen];
}

var screenUpdateCallback = function(task, myscreen) {

	jglClearScreen(128);

	switch (task.thistrial.thisseg) {
		case stimulus.seg.ITI:
			upMask();
			upFix('#000000');
			break;
		case stimulus.seg.stim:
			upFix('#000000');
			upDots(task);
			break;
		case stimulus.seg.ISI:
			upMask();
			upFix('#000000');
			break;
		case stimulus.seg.resp:
			upExamples(task);
			upFix('#ffffff');
			break;
		default:
			AssertException('screenUpdate failed. Segment does not exist');
	}

	return [task, myscreen];

}

function upExamples(task) {
	if (task.thistrial.task==2) {
		// Contrast examples
		for (i=0;i<4;i++) {
			// blt each example one at a time
			jglPoints2(index(stimulus.eDotsC.x[i],stimulus.eDotsC.con,true),index(stimulus.eDotsC.y,stimulus.eDotsC.con,true), 0.2, stimulus.eDotsC.colorB);
			jglPoints2(index(stimulus.eDotsC.x[i],not(stimulus.eDotsC.con),true),index(stimulus.eDotsC.y,not(stimulus.eDotsC.con),true), 0.2, stimulus.eDotsC.colorW);
		}
	} else {
		// coherence examples (Todo)
	}
}

function upMask() {
	jglFillRect(index(stimulus.mask.X,stimulus.mask.black,true), index(stimulus.mask.Y,stimulus.mask.black,true), [stimulus.mask.blocksize,stimulus.mask.blocksize],'#000000');
	jglFillRect(index(stimulus.mask.X,stimulus.mask.white,true), index(stimulus.mask.Y,stimulus.mask.white,true), [stimulus.mask.blocksize,stimulus.mask.blocksize],'#ffffff');

	stimulus.mask.black = sortIndices(stimulus.mask.black,randPerm(task,stimulus.mask.n));
	stimulus.mask.white = not(stimulus.mask.black);
}

function upFix(color) {
	jglFixationCross(2,0.2,color,[0,0]);
}

function upDots(task) {
	stimulus.dotsL = updateDots(task,stimulus.dotsL);
	stimulus.dotsR = updateDots(task,stimulus.dotsR);

	jglPoints2(index(stimulus.dotsL.x,stimulus.dotsL.con,true), index(stimulus.dotsL.y,stimulus.dotsL.con,true), 0.2, stimulus.dots.lBlack);
	jglPoints2(index(stimulus.dotsL.x,not(stimulus.dotsL.con),true), index(stimulus.dotsL.y,not(stimulus.dotsL.con),true), 0.2, stimulus.dots.lWhite);
	jglPoints2(index(stimulus.dotsR.x,stimulus.dotsR.con,true), index(stimulus.dotsR.y,stimulus.dotsR.con,true), 0.2, stimulus.dots.rBlack);
	jglPoints2(index(stimulus.dotsR.x,not(stimulus.dotsR.con),true), index(stimulus.dotsR.y,not(stimulus.dotsR.con),true), 0.2, stimulus.dots.rWhite);
}

function upDotCoherence() {
	// Start by repicking dots
	stimulus.dotsL.incoherent = greaterThan(subtract(rand(task,stimulus.dotsL.n),multiply(stimulus.dotsL.coherence,ones(stimulus.dotsL.n))),zeros(stimulus.dotsL.n));
	stimulus.dotsL.incoherentn = sum(stimulus.dotsL.incoherent);
	stimulus.dotsL.coherent = not(stimulus.dotsL.incoherent);

	stimulus.dotsR.incoherent = greaterThan(subtract(rand(task,stimulus.dotsR.n),multiply(stimulus.dotsR.coherence,ones(stimulus.dotsR.n))),zeros(stimulus.dotsR.n));
	stimulus.dotsR.incoherentn = sum(stimulus.dotsR.incoherent);
	stimulus.dotsR.coherent = not(stimulus.dotsR.incoherent);
}

function updateDots(task,dots) {

	// Check frequency? Not sure how to do this...
	freq_factor = 0.1;

	// Move coherent dots
	dots.X = add(dots.X,dots.dir*freq_factor,dots.coherent);

	// Code below is an attempt to copy my incoherent dot motion matlab code
	xmat = repmat([1,1,-1,-1],dots.incoherentn+4-(dots.incoherentn % 4));
	ymat = repmat([1,-1,1,-1],dots.incoherentn+4-(dots.incoherentn % 4));
	perms = randPerm(task,dots.incoherentn);

	// Build incoherence
	dots.yD = zeros(dots.n);
	dots.xD = zeros(dots.n);

	// Move incoherent dots
	dots.Y = add(dots.Y,dots.yD,dots.incoherent);
	dots.X = add(dots.X,dots.yD,dots.incoherent);

	// Flip dots back if they go too far
	for (var i=0;i<dots.X.length;i++) {
		if (dots.X[i] > dots.maxX) {
			dots.X[i] = dots.X[i] - (dots.maxX - dots.minX);
		} else if (dots.X[i] < dots.minX) {
			dots.X[i] = dots.X[i] + (dots.maxX - dots.minX)
		}
		if (dots.Y[i] > dots.maxY) {
			dots.Y[i] = dots.Y[i] - (dots.maxY - dots.minY);
		} else if (dots.Y[i] < dots.minY) {
			dots.Y[i] = dots.Y[i] + (dots.maxY - dots.minY)
		}
	}

	// Update x, y
	dots.x = multiply(dots.X,dots.mult);
	dots.y = dots.Y;

	return(dots);
}

function myInitStimulus(task) {

	stimulus.seg = {};
	stimulus.seg.ITI = 0;
	stimulus.seg.stim = 1;
	stimulus.seg.ISI = 2;
	stimulus.seg.resp = 3;

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
	stimulus.mask.n = 400; // pre-calculated len(-6.75:0.5:6.75)*len(-4.75:0.5:4.75)
	stimulus.mask.black = sortIndices(repmat([0,1],stimulus.mask.n/2),randPerm(task,stimulus.mask.n));
	stimulus.mask.white = not(stimulus.mask.black);
	stimulus.mask.blocksize = 0.5;

	// build mask
	stimulus.mask.X = [];
	stimulus.mask.Y = [];
	stimulus.mask.x.min = -7;
	stimulus.mask.x.max = -2;
	stimulus.mask.y.min = -5;
	stimulus.mask.y.max = 5;
	for (var i = stimulus.mask.x.min+stimulus.mask.blocksize/2;i < stimulus.mask.x.max;i = i+stimulus.mask.blocksize) {
		for (var j = stimulus.mask.y.min+stimulus.mask.blocksize/2;j<stimulus.mask.y.max;j = j+stimulus.mask.blocksize) {
			stimulus.mask.X.push(i);
			stimulus.mask.Y.push(j);
		}		
	}
	stimulus.mask.x.min = 2;
	stimulus.mask.x.max = 7;
	stimulus.mask.y.min = -5;
	stimulus.mask.y.max = 5;
	for (var i = stimulus.mask.x.min+stimulus.mask.blocksize/2;i < stimulus.mask.x.max;i = i+stimulus.mask.blocksize) {
		for (var j = stimulus.mask.y.min+stimulus.mask.blocksize/2;j<stimulus.mask.y.max;j = j+stimulus.mask.blocksize) {
			stimulus.mask.X.push(i);
			stimulus.mask.Y.push(j);
		}		
	}

	stimulus.dots = {};
	stimulus.dots.lWhite = '#ffffff';
	stimulus.dots.rWhite = '#ffffff';
	stimulus.dots.lBlack = '#000000';
	stimulus.dots.rBlack = '#000000';
	
	stimulus.dotsL = {};
	stimulus.dotsL.minX = 2;
	stimulus.dotsL.maxX = 7;
	stimulus.dotsL.minY= -5;
	stimulus.dotsL.maxY = 5;
	stimulus.dotsL.dir = 1;
	stimulus.dotsL.n = 100;
	stimulus.dotsL.con = sortIndices(repmat([0,1],stimulus.dotsL.n/2),randPerm(task,stimulus.dotsL.n));
	stimulus.dotsL.group = []
	stimulus.dotsL.X = add(multiply(rand(task,stimulus.dotsL.n), (stimulus.dotsL.maxX-stimulus.dotsL.minX)),stimulus.dotsL.minX);
	stimulus.dotsL.Y = add(multiply(rand(task,stimulus.dotsL.n), (stimulus.dotsL.maxY-stimulus.dotsL.minY)),stimulus.dotsL.minY);
	stimulus.dotsL.coherent = ones(stimulus.dotsL.n);
	stimulus.dotsL.mult = -1;
	stimulus.dotsL.x = multiply(stimulus.dotsL.X,stimulus.dotsL.mult);
	stimulus.dotsL.y = stimulus.dotsL.Y;

	stimulus.dotsR = {};
	stimulus.dotsR.minX = 2;
	stimulus.dotsR.maxX = 7;
	stimulus.dotsR.minY= -5;
	stimulus.dotsR.maxY = 5;
	stimulus.dotsR.dir = 1;
	stimulus.dotsR.n = 100;
	stimulus.dotsR.con = sortIndices(repmat([0,1],stimulus.dotsL.n/2),randPerm(task,stimulus.dotsR.n));
	stimulus.dotsR.group = []
	stimulus.dotsR.X = add(multiply(rand(task,stimulus.dotsR.n), (stimulus.dotsR.maxX-stimulus.dotsR.minX)),stimulus.dotsR.minX);
	stimulus.dotsR.Y = add(multiply(rand(task,stimulus.dotsR.n), (stimulus.dotsR.maxY-stimulus.dotsR.minY)),stimulus.dotsR.minY);
	stimulus.dotsR.coherent = ones(stimulus.dotsR.n);
	stimulus.dotsR.mult = 1;
	stimulus.dotsR.x = multiply(stimulus.dotsR.X,stimulus.dotsR.mult);
	stimulus.dotsR.y = stimulus.dotsR.Y;

	// example dots for contrast, static
	stimulus.eDotsC = {};
	stimulus.eDotsC.n = 10;
	stimulus.eDotsC.minX = [-10, 6, -10, 6];
	stimulus.eDotsC.maxX = [-6, 10, -6, 10];
	stimulus.eDotsC.minY = [2, 2, -5, -5];
	stimulus.eDotsC.maxY = [5, 5, -2, -2];
	stimulus.eDotsC.con = sortIndices(repmat([0,1],stimulus.eDotsC.n/2),randPerm(task,stimulus.eDotsC.n));
	stimulus.eDotsC.colorW = [con2hex(1),con2hex(0.6),con2hex(0.6),con2hex(1)];
	stimulus.eDotsC.colorB = [con2hex(0),con2hex(0.4),con2hex(0.4),con2hex(0)];
	stimulus.eDotsC.x = []; stimulus.eDotsC.y = [];
	for (var i=0;i<4;i++) {
		xs = add(multiply(rand(task,stimulus.eDotsC.n),stimulus.eDotsC.maxX[i]-stimulus.eDotsC.maxX[i]),stimulus.eDotsC.minX[i]);
		ys = add(multiply(rand(task,stimulus.eDotsC.n),stimulus.eDotsC.maxY[i]-stimulus.eDotsC.maxY[i]),stimulus.eDotsC.minY[i]);
		stimulus.eDotsC.x.push(xs);
		stimulus.eDotsC.y.push(ys);
	}

	// example dots for motion, two static, two moving
	stimulus.eDotsM = {};
}

function genXArray(length) {
	var negs = lessThan(rand(task[0][0], length), 0.5);

	var values = add(multiply(rand(task[0][0], length), stimulus.dots.xrange - stimulus.dots.lineBuf), stimulus.dots.lineBuf);

	values = change(values, multiply(index(values, negs, true), -1), negs);

	return values;

}
