var http = require('http'),
    httpProxy = require('http-proxy'),
	gm = require('gm');

module.exports = httpProxy.createServer(function(req,res,proxy) {
	console.log('request made!' + req.url);
	var parsed = require('url').parse(req.url),
		port = ( parsed.protocol == 'https:'? 443 : 80 ),
		host = parsed.host,
		path = parsed.path;

	if( /.*\.(png|jpg|gif).*$/i.test(path) ) {
		http.request(parsed, function(proxy_res) {
			gm(proxy_res, 'test')
				.blur(1,1)
				.autoOrient()
				.stream(function (err, stdout, stderr) {
					stdout.pipe(res);
				});
		}).end();
	} else {

		proxy.proxyRequest(req, res, {
			host: host,
			port: port
		});
		
	}

});
