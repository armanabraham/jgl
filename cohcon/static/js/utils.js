
function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
	return 'AssertException: ' + this.message;
};

function assert(exp, message) {
	if (!exp) {
		throw new AssertException(message);
	}
}

// Mean of booleans (true==1; false==0)
function boolpercent(arr) {
	var count = 0;
	for (var i=0; i<arr.length; i++) {
		if (arr[i]) { count++; } 
	}
	return 100* count / arr.length;
}

sortIndices = function (array,indices) {
    var i = array.length,
    ret = zeros(array.length);

    while (i--) {
        ret[i-1] = array[indices[i-1]];
    }
    return(ret);
}

con2hex = function(contrast) {
	con = Math.round(contrast*255);
	conS = con.toString(16);
	hex = '#' + conS + conS + conS;
	return(hex);
}