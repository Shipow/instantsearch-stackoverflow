$(document).foundation();

var search = instantsearch({
  appId: config.algolia.appID,
  apiKey: config.algolia.searchKey,
  indexName: 'instantsearch-so-' + config.stackoverflow.keyword,
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Search a question',
    poweredBy: true
  })
);

var hitTemplate =
  '<article class="hit">' +
    '<div class="stats-wrapper {{#answerAccepted}}accepted{{/answerAccepted}} {{^answers}}not-answered{{/answers}}">' +
      '<div class="votes"><span class="nbVotes">{{nbVotes}}</span>Votes</div>' +
      '<div class="answers"><span class="nbAnswers">{{answers.length}}</span>Answers</div>' +
    '</div>' +
    '<div class="content-wrapper">' +
      '<h1>Q: <a href="{{href}}">{{{_highlightResult.title.value}}}</a></h1>' +
      '<div class="text">{{{_snippetResult.text.value}}}...</div>' +
      '<div class="infos">' +
        '<a href="{{authorUrl}}"><img class="avatar" src="{{authorAvatar}}">{{author}}</a>' +
        ' - viewed {{nbViews}} times - {{timeAgo}} - {{comments.length}} comments' +
      '</div>' +
      '{{#tags}}<span class="label">{{.}}</span>{{/tags}}' +
    '</div>' +
  '</article>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 30,
    templates: {
      item: hitTemplate
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: 'Previous page',
      next: 'Next page'
    },
    showFirstLast: false
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#tags',
    attributeName: 'tags',
    operator: 'and',
    limit: 20,
    cssClasses: {
      active: 'active'
    },
    templates: {
      header: '<div class="facet-title">Tags</div>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#answersAuthor',
    attributeName: 'answers.author',
    operator: 'or',
    limit: 20,
    cssClasses: {
      active: 'active'
    },
    templates: {
      header: '<div class="facet-title">Answered by</div>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#accepted',
    attributeName: 'answers.accepted',
    operator: 'or',
    limit: 10,
    cssClasses: {
      active: 'active'
    },
    templates: {
      header: '<div class="facet-title">Accepted</div>'
    }
  })
);

search.start();
