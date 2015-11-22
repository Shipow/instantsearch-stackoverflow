var config = {};

config.stackoverflow = {};
config.algolia = {};

config.stackoverflow.keyword = process.env.STACKOVERFLOW_KEYWORD || 'algolia';
config.algolia.appID = process.env.ALGOLIA_APP_ID || 'T2ZX9HO66V';
config.algolia.searchKey = process.env.ALGOLIA_SEARCH_KEY || '7119d2f6f1cd95224251ec2e490e824f';

module.exports = config;
