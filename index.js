const path = require('path');
const maxmind = require('maxmind');
let lookup;

const load = () => maxmind.openSync(path.resolve(`${__dirname}/GeoLite2-City.mmdb`));
const formatToApi = (body, statusCode = 200) => {
    return {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode
    }
};

const parseFromApi = event => {
    let {
        body = {},
            headers = {},
            pathParameters = {},
            queryStringParameters = {}
    } = event;

    if (typeof body === 'string') {
        body = JSON.parse(body);
    }

    return {
        params: Object.assign({},
            body,
            pathParameters,
            queryStringParameters
        ),
        headers
    };
};

exports.handler = (event, context, callback) => {
    if (!lookup) {
        lookup = load();
    }

    if (event.requestContext) {
        const {
            params,
            headers
        } = parseFromApi(event);

        return callback(null, formatToApi(params.ip ? lookup.get(params.ip) : {}));
    }

    callback(null, event.ip ? lookup.get(event.ip) : {});
};

// exports.handler({
//     body: {
//         ip: '138.186.164.84'
//     },
//     requestContext: true
// }, null, console.log);
