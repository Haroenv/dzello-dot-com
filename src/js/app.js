var instantsearch = window.instantsearch;

const search = instantsearch({
  appId: window.algolia.appId,
  apiKey: window.algolia.searchApiKey,
  indexName: window.algolia.indexName,
  searchParameters: {
    hitsPerPage: 4,
    filters: "kind:page AND draft:false"
  },
  searchFunction: function(helper) {
    if (helper.state.query) {
      helper.search();
    } else {
      document.getElementById("algolia-hits").innerHTML = "";
    }
  }
});

search.addWidget(
  instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      empty: '<p>Drag, no results.</p>',
      item: `
      <div>
        <p>
          <a href="{{{ url }}}">{{{_highlightResult.title.value}}}</a> &middot; {{{_snippetResult.content.value}}}
        </p>
      </div>
      `,
      footer: '<a href="https://algolia.com/"><img src="/images/search-by-algolia.png"></a>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#algolia-search',
    magnifier: false,
    reset: false,
    wrapInput: false,
    autofocus: false
  })
);

search.start();
