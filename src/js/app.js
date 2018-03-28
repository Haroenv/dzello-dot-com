function initializeSearch() {

  var instantsearch = window.instantsearch;

  const search = instantsearch({
    appId: window.algolia.appId,
    apiKey: window.algolia.searchApiKey,
    indexName: window.algolia.indexName,
    searchParameters: {
      hitsPerPage: 5,
      filters: "kind:page AND draft:false"
    },
    searchFunction: function(helper) {
      if (helper.state.query) {
        helper.search();
        $("#main-inner").addClass("search-active");
        $("#algolia-attribution").addClass("search-active");
      } else {
        document.getElementById("algolia-hits").innerHTML = "";
        $("#main-inner").removeClass("search-active");
        $("#algolia-attribution").removeClass("search-active");
      }
    }
  });

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        empty: '<p>N😭 RESULTS</p>',
        item: `
        <div>
          <p>
            <a href="{{{ url }}}">{{{_highlightResult.title.value}}}</a> &middot; {{{_snippetResult.content.value}}}
          </p>
        </div>
        `,
        footer: '<a href="https://algolia.com/"><img src="/images/search-by-algolia.svg"></a>'
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

}

if (window.algolia.appId) {
  initializeSearch();
}
