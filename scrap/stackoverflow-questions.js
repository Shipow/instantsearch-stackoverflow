var algoliasearch = require('algoliasearch');
var _ = require('lodash');
var phantom = require('x-ray-phantom');
var Xray = require('x-ray');


var x = new Xray();
var xphan = new Xray().driver(phantom());

var soKeyword = process.env.STACKOVERFLOW_KEYWORD;
var algoliaAppId = process.env.ALGOLIA_APP_ID;
var algoliaWriteKey = process.env.ALGOLIA_WRITE_KEY;

var client = algoliasearch(algoliaAppId, algoliaWriteKey);
var index = client.initIndex('instantsearch-so-'+ soKeyword);

client.setRequestTimeout(3600000);

xphan('http://stackoverflow.com/search?tab=newest&q=' + soKeyword + '+is%3Aquestion', '.result-link', [{
  href: 'a@href'
}])
.paginate('a[rel="next"]@href')
(function(err, links) {
  console.log(err, links);
  var i = 0;
  var numberPattern = /\d+/g;
  _.forEach(links, function(link){
    x(link.href, '#content', [{
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
        text: '.comment-copy@html',
        author: '.comment-user',
        authorUrl: '.comment-user@href'
      }]),
      answers: x('.answer',[{
        text: '.post-text@html',
        accepted: '.vote-accepted-on',
        author: '.user-details a',
        authorUrl: '.user-details a@href',
        authorAvatar: '.user-gravatar32 img@src'
      }]),
      date: '.post-signature.owner .relativetime@title'
    }])
    (function(err, scrap) {
      i++;
      scrap[0].date = Date.parse(scrap[0].date);
      scrap[0].nbViews = parseInt((scrap[0].nbViews).match( numberPattern )) || 0;
      if (i === links.length){
        console.log('finish');
      }
      index.addObject(scrap[0], function(err) {
        if (err) {
          // console.error("ERROR: %s", err);
          return false;
        }
      });
    });
  });
});
