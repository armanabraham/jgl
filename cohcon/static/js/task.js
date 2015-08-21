$(document).ready(function() {
	cohcon();
});

function cohcon() {

  	window.myscreen = initScreen();

	var instructionPages = [ // add as a list as many pages as you like
		"instructions/instruct-1.html",
		"instructions/instruct-2.html",
		"instructions/instruct-3.html",
		"instructions/instruct-4.html",
		"instructions/instruct-4-5.html",
		"instructions/instruct-5.html",
		"instructions/instruct-ready.html"
	];

	var conPages = ["instructions/instruct-con.html"];
	var motPages = ["instructions/instruct-mot.html"];

	var pracTrials = 3;
	var fullTrials = 3;

	window.task = [];
	task[0] = [];
	task[0][0] = initSurvey();
	task[0][0].html = "survey.html";

	task[0][1] = initInstructions(instructionPages);

	var order = [];
	if (randomElement([true,false])) {
		order = [2,3,4,5];
	} else {
		order = [4,5,2,3];
	}
	task[0][2] = {}; task[0][3] = {};
	task[0][4] = {}; task[0][5] = {};

	// Practice Run for Motion
	task[0][order[0]] = initInstructions(motPages);

	task[0][order[1]] = {};
	task[0][order[1]].waitForBacktick = 0;
	task[0][order[1]].segmin = [0.5,0.2,0.5,0,4];
	task[0][order[1]].segmax = [0.5,0.2,0.5,0,4];
	task[0][order[1]].numTrials = pracTrials;
	task[0][order[1]].parameter = {};
	task[0][order[1]].parameter.practice = 1;
	task[0][order[1]].parameter.conP = 0.6;
	task[0][order[1]].parameter.conInc = [0.1];
	task[0][order[1]].parameter.conSide = [1, 2];
	task[0][order[1]].parameter.cohP = [0.1];
	task[0][order[1]].parameter.cohInc = [0.3];
	task[0][order[1]].parameter.cohSide = [1, 2];
	task[0][order[1]].parameter.dir = [-1,1];
	task[0][order[1]].parameter.task = 1;
	task[0][order[1]].parameter.crit = 0;
	task[0][order[1]].random = 1;
	task[0][order[1]].usingScreen = 1;
	task[0][order[1]].getResponse = [0,0,0,0,1];
	task[0][order[1]].html = "canvas.html";

	// Practice Run for Contrast
	task[0][order[2]] = initInstructions(conPages);

	task[0][order[3]] = {};
	task[0][order[3]].waitForBacktick = 0;
	task[0][order[3]].segmin = [0.5,0.2,0.5,0,4];
	task[0][order[3]].segmax = [0.5,0.2,0.5,0,4];
	task[0][order[3]].numTrials = pracTrials;
	task[0][order[3]].parameter = {};
	task[0][order[3]].parameter.practice = 1;
	task[0][order[3]].parameter.conP = 0.6;
	task[0][order[3]].parameter.conInc = [0.1];
	task[0][order[3]].parameter.conSide = [1, 2];
	task[0][order[3]].parameter.cohP = [0.1];
	task[0][order[3]].parameter.cohInc = [0.3];
	task[0][order[3]].parameter.cohSide = [1, 2];
	task[0][order[3]].parameter.dir = [-1,1];
	task[0][order[3]].parameter.task = 2;
	task[0][order[3]].parameter.crit = 0;
	task[0][order[3]].random = 1;
	task[0][order[3]].usingScreen = 1;
	task[0][order[3]].getResponse = [0,0,0,0,1];
	task[0][order[3]].html = "canvas.html";

	// Full run for XXX
	var fullOrder = [];
	if (randomElement([true,false])) {
		fullOrder = [1,2]; // coherence first
	} else {
		fullOrder = [2,1]; // contrast first
	}

	task[0][6] = initSurvey();
	task[0][6].html = "preExp.html";

	if (fullOrder[0]==1) {task[0][7] = initInstructions(motPages);} else {task[0][7] = initInstructions(conPages);}

	task[0][8] = {};
	task[0][8].segmin = [0.5,0.025,0.5,0,2];
	task[0][8].segmax = [0.5,0.2,0.5,0,2];
	task[0][8].numTrials = fullTrials;
	task[0][8].parameter = {};
	task[0][8].parameter.practice = 0;
	task[0][8].parameter.practice = 1;
	task[0][8].parameter.conP = 0.6;
	task[0][8].parameter.conInc = [0.1];
	task[0][8].parameter.conSide = [1, 2];
	task[0][8].parameter.dir = [-1,1];
	task[0][8].parameter.cohP = [0.1];
	task[0][8].parameter.cohInc = [0.3];
	task[0][8].parameter.cohSide = [1, 2];
	task[0][8].parameter.crit = 0;
	task[0][8].parameter.task = fullOrder[0];
	task[0][8].random = 1;
	task[0][8].usingScreen = 1;
	task[0][8].getResponse = [0,0,0,0,1];
	task[0][8].html = "canvas.html";

	//CRITICAL TRIAL
	task[0][9] = {};
	task[0][9].segmin = [0.5,0.025,0.5,3,8];
	task[0][9].segmax = [0.5,0.3,0.5,3,8];
	task[0][9].numTrials = 1;
	task[0][9].parameter = {};
	task[0][9].parameter.practice = 0;
	task[0][9].parameter.practice = 1;
	task[0][9].parameter.conP = 0.6;
	task[0][9].parameter.conInc = [0.1];
	task[0][9].parameter.conSide = [1, 2];
	task[0][9].parameter.dir = [-1,1];
	task[0][9].parameter.cohP = [0.1];
	task[0][9].parameter.cohInc = [0.3];
	task[0][9].parameter.cohSide = [1, 2];
	task[0][9].parameter.task = fullOrder[1];
	task[0][9].parameter.crit = 1;
	task[0][9].usingScreen = 1;
	task[0][9].getResponse = [0,0,0,0,1];
	task[0][9].html = "canvas.html";

	if (fullOrder[1]==1) {task[0][10] = initInstructions(motPages);} else {task[0][10] = initInstructions(conPages);}

	//FULL RUN
	task[0][11] = {};
	task[0][11].segmin = [0.5,0.025,0.5,0,2];
	task[0][11].segmax = [0.5,0.2,0.5,0,2];
	task[0][11].numTrials = fullTrials;
	task[0][11].parameter = {};
	task[0][11].parameter.practice = 0;
	task[0][11].parameter.practice = 1;
	task[0][11].parameter.conP = 0.6;
	task[0][11].parameter.conInc = [0.1];
	task[0][11].parameter.conSide = [1, 2];
	task[0][11].parameter.dir = [-1,1];
	task[0][11].parameter.cohP = [0.1];
	task[0][11].parameter.cohInc = [0.3];
	task[0][11].parameter.cohSide = [1, 2];
	task[0][11].parameter.task = fullOrder[1];
	task[0][11].parameter.crit = 0;
	task[0][11].random = 1;
	task[0][11].usingScreen = 1;
	task[0][11].getResponse = [0,0,0,0,1];
	task[0][11].html = "canvas.html";

	task[0][12] = initSurvey();
	task[0][12].html = "postquestionnaire-2.html";


	task[0][3] = initTask(task[0][3], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback);
	task[0][5] = initTask(task[0][5], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback);
	task[0][8] = initTask(task[0][8], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback);
	task[0][9] = initTask(task[0][9], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback);
	task[0][11] = initTask(task[0][11], startSegmentCallback, screenUpdateCallback, getResponseCallback, startTrialCallback);

	window.stimulus = {};
	initStimulus('stimulus');

	myInitStimulus(task);

	var critTasks = ['Motion','Contrast'];
	stimulus.critTask = critTasks[fullOrder[1]-1];

	initTurk();

	jglData.responses = [];
	jglData.correct = [];
	jglData.postSurvey = {};

	startPhase(task[0]);
}

var startTrialCallback = function(task, myscreen) {
	console.log(task.thistrial.conSide);
	console.log(task.thistrial.cohSide);
	if (task.trialnum >= stimulus.critTrial) {
		task.thistrial.task = 2;
	}
	if(task.trialnum == stimulus.critTrial) {
		task.thistrial.seglen[stimulus.seg.resp] = 10;
	}
	jglData.responses.push(0);
	jglData.correct.push(0);
	stimulus.gotResp = false;
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

var getResponseCallback = function(task, myscreen) {
	switch (jglData.keys[jglData.keys.length-1].keyCode) {
		case 68:
			var resp = 2;
			break;
		case 65:
			var resp = 1;
			break;
		default:
			console.log('response not recognized');
	}
	if (task.thistrial.task==2) {
		// contrast
		stimulus.gotResp = task.thistrial.conSide == resp ? 1 : -1; 
	} else {
		stimulus.gotResp = task.thistrial.cohSide == resp ? 1 : -1; 
	}
	jglData.responses[task.trialnum] = resp;
	jglData.correct[task.trialnum] = stimulus.gotResp;
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
		case stimulus.seg.crit:
			if (task.thistrial.crit) {
				jglTextSet('Arial',1,'#000000',0,0);
				jglTextDraw('Respond about ' + stimulus.critTask,-5,-3);
				jglTextDraw('You have Extra Time',-5,3);
			}
			break;
		case stimulus.seg.resp:
			if (stimulus.gotResp==0) {
				upExamples(task);
				upFix('#ffffff');
			} else if (stimulus.gotResp==1) {
				upFix('#00ff00');
			} else {
				upFix('#ff0000');
			}
			break;
		default:
			AssertException('screenUpdate failed. Segment does not exist');
	}

	return [task, myscreen];

}

function upExamples(task) {
	jglTextSet('Arial',1,'#000000',0,0);
	if (task.thistrial.task==2) {
		// Contrast examples
		for (var i=0;i<4;i++) {
			// blt each example one at a time
			jglPoints2(index(stimulus.eDotsC.x[i],stimulus.eDotsC.con,true),index(stimulus.eDotsC.y[i],stimulus.eDotsC.con,true), 0.2, stimulus.eDotsC.colorB[i]);
			jglPoints2(index(stimulus.eDotsC.x[i],not(stimulus.eDotsC.con),true),index(stimulus.eDotsC.y[i],not(stimulus.eDotsC.con),true), 0.2, stimulus.eDotsC.colorW[i]);
		}
	} else {
		// coherence examples 
		for (var i=0;i<4;i++) {
			// blt each example one at a time
			if (stimulus.eDotsM.dir[i]!=0) {
				stimulus.eDotsM.x[i] = add(stimulus.eDotsM.x[i],freq_factor/2*stimulus.eDotsM.dir[i]*task.thistrial.dir);
				for (var j=0;j<stimulus.eDotsM.x[i].length;j++) {
					if (stimulus.eDotsM.x[i][j] > stimulus.eDotsM.maxX[i]) {
						stimulus.eDotsM.x[i][j] = stimulus.eDotsM.x[i][j] - (stimulus.eDotsM.maxX[i] - stimulus.eDotsM.minX[i]);
					} else if (stimulus.eDotsM.x[i][j] < stimulus.eDotsM.minX[i]) {
						stimulus.eDotsM.x[i][j] = stimulus.eDotsM.x[i][j] + (stimulus.eDotsM.maxX[i] - stimulus.eDotsM.minX[i])
					}
					if (stimulus.eDotsM.y[i][j] > stimulus.eDotsM.maxY[i]) {
						stimulus.eDotsM.y[i][j] = stimulus.eDotsM.y[i][j] - (stimulus.eDotsM.maxY[i] - stimulus.eDotsM.minY[i]);
					} else if (stimulus.eDotsM.y[i][j] < stimulus.eDotsM.minY[i]) {
						stimulus.eDotsM.y[i][j] = stimulus.eDotsM.y[i][j] + (stimulus.eDotsM.maxY[i] - stimulus.eDotsM.minY[i])
					}
				}
			}
			jglPoints2(index(stimulus.eDotsM.x[i],stimulus.eDotsM.con,true),index(stimulus.eDotsM.y[i],stimulus.eDotsM.con,true), 0.2, '#000000');
			jglPoints2(index(stimulus.eDotsM.x[i],not(stimulus.eDotsM.con),true),index(stimulus.eDotsM.y[i],not(stimulus.eDotsM.con),true), 0.2, '#ffffff');
		}
	}
	jglTextDraw('D',-0.45,-2.75);
	jglTextDraw('A',-0.35,2.9);
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
	dots.X = add(dots.X,task.thistrial.dir*freq_factor,dots.coherent);

	// Code below is an attempt to copy my incoherent dot motion matlab code
	// var xmat = repmat([1,1,-1,-1],dots.incoherentn+4-(dots.incoherentn % 4));
	// var ymat = repmat([1,-1,1,-1],dots.incoherentn+4-(dots.incoherentn % 4));
	// var perms = randPerm(task,dots.incoherentn);

	// Build incoherence
	// dots.yD = zeros(dots.n);
	// dots.xD = zeros(dots.n);

	// Move incoherent dots
	// dots.Y = add(dots.Y,dots.yD,dots.incoherent);
	// dots.X = add(dots.X,dots.yD,dots.incoherent);

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
	stimulus.critTrial = 5;

	stimulus.seg = {};
	stimulus.seg.ITI = 0;
	stimulus.seg.stim = 1;
	stimulus.seg.ISI = 2;
	stimulus.seg.crit = 3;
	stimulus.seg.resp = 4;

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
	stimulus.eDotsC.n = 30;
	stimulus.eDotsC.minX = [-3, 1, -3, 1];
	stimulus.eDotsC.maxX = [-1, 3, -1, 3];
	stimulus.eDotsC.minY = [2, 2, -5, -5];
	stimulus.eDotsC.maxY = [5, 5, -2, -2];
	stimulus.eDotsC.con = sortIndices(repmat([0,1],stimulus.eDotsC.n/2),randPerm(task,stimulus.eDotsC.n));
	stimulus.eDotsC.colorW = [con2hex(1),con2hex(0.6),con2hex(0.6),con2hex(1)];
	stimulus.eDotsC.colorB = [con2hex(0),con2hex(0.4),con2hex(0.4),con2hex(0)];
	stimulus.eDotsC.x = []; stimulus.eDotsC.y = [];
	for (var i=0;i<4;i++) {
		xs = add(multiply(rand(task,stimulus.eDotsC.n),stimulus.eDotsC.maxX[i]-stimulus.eDotsC.minX[i]),stimulus.eDotsC.minX[i]);
		ys = add(multiply(rand(task,stimulus.eDotsC.n),stimulus.eDotsC.maxY[i]-stimulus.eDotsC.minY[i]),stimulus.eDotsC.minY[i]);
		stimulus.eDotsC.x.push(xs);
		stimulus.eDotsC.y.push(ys);
	}

	// example dots for motion, two static, two moving
	stimulus.eDotsM = {};
	stimulus.eDotsM.n = 30;
	stimulus.eDotsM.minX = [-3, 1, -3, 1];
	stimulus.eDotsM.maxX = [-1, 3, -1, 3];
	stimulus.eDotsM.minY = [2, 2, -5, -5];
	stimulus.eDotsM.maxY = [5, 5, -2, -2];
	stimulus.eDotsM.dir = [-1,0,0,1];
	stimulus.eDotsM.con = sortIndices(repmat([0,1],stimulus.eDotsM.n/2),randPerm(task,stimulus.eDotsM.n));
	stimulus.eDotsM.x = []; stimulus.eDotsM.y = [];
	for (var i=0;i<4;i++) {
		xs = add(multiply(rand(task,stimulus.eDotsM.n),stimulus.eDotsM.maxX[i]-stimulus.eDotsM.minX[i]),stimulus.eDotsC.minX[i]);
		ys = add(multiply(rand(task,stimulus.eDotsM.n),stimulus.eDotsM.maxY[i]-stimulus.eDotsM.minY[i]),stimulus.eDotsC.minY[i]);
		stimulus.eDotsM.x.push(xs);
		stimulus.eDotsM.y.push(ys);
	}
}
