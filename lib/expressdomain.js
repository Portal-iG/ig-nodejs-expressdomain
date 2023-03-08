var domain = require('domain')
var logger = require('winston');

module.exports = function (req, res, next) {
	var d = domain.create();

	d.on('error', function (err) {
        logger.error('Request handler raised exception',
        	'- process may have been tainted', 
        	err.stack || err);
        res.send(500);
    })

    d.add(req);
    d.add(res);

    d.run(function () {
    	next();
    })
}