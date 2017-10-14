var scrapper = function() {
  console.log('Start scrap');
  var algoliasearch = require('algoliasearch');
  var _ = require('lodash');
  var Xray = require('x-ray');
  var async = require('async');

  var config = require('../config/admin.js')

  var x = new Xray();
  // var xphan = new Xray().driver(phantom());
  x.throttle(1, 2000);

  var client = algoliasearch(config.algolia.appID, config.algolia.writeKey);
  client.setRequestTimeout(3600000);
  var index = client.initIndex('instantsearch-so-'+ config.stackoverflow.keyword);
  var settings = {"minWordSizefor1Typo":4,
    "minWordSizefor2Typos":8,
    "hitsPerPage":20,
    "maxValuesPerFacet":100,
    "attributesToIndex":["title","tags","author"],
    "numericAttributesToIndex":null,
    "attributesToRetrieve":null,
    "allowTyposOnNumericTokens":true,
    "ignorePlurals":false,
    "advancedSyntax":false,
    "removeStopWords":false,
    "replaceSynonymsInHighlight":true,
    "distinct":false,
    "unretrievableAttributes":null,
    "optionalWords":null,
    "slaves":[],
    "attributesForFaceting":["tags","withAcceptedAnswer","withAnswer","answers.author"],
    "attributesToSnippet":["text:60"],
    "attributesToHighlight":null,
    "attributeForDistinct":null,
    "ranking":["typo","geo","words","proximity",
    "attribute","exact","custom"],
    "customRanking":["desc(date)","desc(vote)"],
    "separatorsToIndex":"",
    "removeWordsIfNoResults":"none",
    "queryType":"prefixLast",
    "highlightPreTag":"<em>",
    "highlightPostTag":"</em>",
    "typoTolerance":"true" };

  index.setSettings(settings);

  var numberPattern = /\d+/g;

  x('http://stackoverflow.com/search?tab=newest&q=' + config.stackoverflow.keyword + '+is%3Aquestion&pagesize=50', '.result-link', [{
    href: 'a@href',
    question: x('a@href', '#content .inner-content', [{
      title: 'h1',
      objectID: '.question@data-questionid',
      text: '.post-text@html',
      href: 'h1 a@href',
      author: '.post-signature.owner .user-details a',
      authorUrl: '.post-signature.owner .user-details a@href',
      authorAvatar: '.post-signature.owner .gravatar-wrapper-32 img@src',
      nbVotes: '.question .vote-count-post',
      nbViews: '#qinfo tr:nth-child(2)',
      timeAgo: '#qinfo tr:nth-child(1)',
      tags: x('.post-taglist',['a']),
      answerAccepted: '.answer.accepted-answer@data-answerid',
      comments: x('.comment',[{
        // text: '.comment-copy@html',
        author: '.comment-user',
        authorUrl: '.comment-user@href'
      }]),
      answers: x('.answer',[{
        // text: '.post-text@html',
        accepted: '.vote-accepted-on',
        author: '.user-details a',
        authorUrl: '.user-details a@href',
        authorAvatar: '.user-gravatar32 img@src'
      }]),
      date: '.post-signature.owner .relativetime@title'
    }])
  }])
  .paginate('.pager a[rel="next"]@href')
  //.write('scrap/questions.json');

  (function(err, data) {
    console.log(data.length);
    data = data.filter(function (item) { return !!item.question[0]; });
    _.forEach(data, function(item,k){
      question = item.question[0];
      data[k] = question;
      data[k].href = question.href;
      data[k].date = Date.parse(question.date);
      data[k].nbViews = parseInt((question.nbViews).match( numberPattern )) || 0;
      data[k].withAnswer = (question.answers || []).length > 0;
      data[k].withAcceptedAnswer = (question.answers || []).some(function (answer) { return answer.accepted });
    });
    // split our results into chunks of 200 objects, to get a good indexing/insert performance
    var chunkedResults = _.chunk(data, 200);
    async.each(chunkedResults, index.saveObjects.bind(index), end);
    function end(err) {
      if (err) {
        throw err;
      }
      console.log('Algolia import done')
    };
  });
};

// now expose with module.exports:
module.exports = scrapper;
