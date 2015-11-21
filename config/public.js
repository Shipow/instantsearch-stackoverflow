var config = {};

config.stackoverflow = {};
config.algolia = {};

config.stackoverflow.keyword = process.env.STACKOVERFLOW_KEYWORD || 'stackoverflowKeyword';
config.algolia.appID = process.env.ALGOLIA_APP_ID || 'appID';
config.algolia.searchKey = process.env.ALGOLIA_SEARCH_KEY || 'searchKey';

module.exports = config;
