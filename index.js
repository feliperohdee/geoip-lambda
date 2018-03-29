const path = require('path');
const maxmind = require('maxmind');
let lookup;

const load = () => maxmind.openSync(path.resolve(`${__dirname}/GeoLite2-City.mmdb`));

exports.handler = (event, context, callback) => {
    if (!lookup) {
        lookup = load();
    }

    callback(null, event.ip ? lookup.get(event.ip) : {});
};

// exports.handler({
//     ip: '138.186.164.84'
// }, null, console.log);
