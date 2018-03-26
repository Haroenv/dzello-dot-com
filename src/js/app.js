var instantsearch = window.instantsearch;

const search = instantsearch({
  appId: "62V6D1ZEHQ",
  apiKey: "f62beb1c69d8ad7ae73b50e8db9da227",
  indexName: "hugo-content",
  searchParameters: {
    hitsPerPage: 4,
    filters: "type:blog AND kind:page AND draft:false"
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
        <a href="{{{ url }}}">
          {{{_highlightResult.title.value}}}
        </a>
        <p>{{{_snippetResult.content.value}}}</p>
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
    wrapInput: false
  })
);

search.start();
