var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

//get the port from the command line, or default
var port = process.argv[2] || 9999;
var count = process.argv[3] || numCPUs;

if (cluster.isMaster) {
	
	// Fork workers.
	for (var i = 0; i < count; i++) {
		cluster.fork();
	}

	cluster.on('death', function(worker) {
		cluster.fork();
	});

} else {
	// Worker processes have a http server.
	var app = require('./proxy');
	app.listen(port);
}