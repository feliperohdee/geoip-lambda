const maxmind = require('maxmind');
let lookup;

const load = () => maxmind.openSync('./GeoLite2-City.mmdb');

exports.handler = (event, context, callback) => {
	if(!lookup){
		lookup = load();
	}

	callback(null, {
        statusCode: 200,
        headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(lookup.get(event.queryStringParameters.ip))
    });
};

// exports.handler({
// 	queryStringParameters: {
// 		ip: '138.186.164.84'
// 	}
// }, null, console.log);
