var config = require('./public');

config.algolia.writeKey = process.env.ALGOLIA_WRITE_KEY || 'writeKey';

module.exports = config;
