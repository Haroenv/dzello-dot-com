function initializeSearch() {

  var instantsearch = window.instantsearch;

  var search = instantsearch({
    appId: window.algolia.appId,
    apiKey: window.algolia.searchApiKey,
    indexName: window.algolia.indexName,
    searchParameters: {
      hitsPerPage: 3,
      filters: "kind:page"
    },
    searchFunction: function(helper) {
      if (helper.state.query) {
        $("#algolia-attribution").hide();
        helper.search();
      } else {
        document.getElementById("algolia-hits").innerHTML = "";
        $("#algolia-attribution").show();
      }
    }
  });

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        empty: '<p>N😭 RESULTS</p>',
        item: " \
        <div> \
          <p> \
            <a href='{{{ url }}}'>{{{_highlightResult.title.value}}}</a> &middot; <span>{{{_snippetResult.content.value}}}</span> \
          </p> \
        </div> \
        ",
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
  $("#algolia-search").focus();
}