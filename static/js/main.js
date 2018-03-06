var client = algoliasearch("62V6D1ZEHQ", "df8df3195278e73311899227a1348376")
var index = client.initIndex('jekyll-content');
autocomplete('#search', {
  hint: false,
  openOnFocus: true
}, [{
    source: autocomplete.sources.hits(index, {hitsPerPage: 10}),
    displayKey: 'text',
    templates: {
      suggestion: function(suggestion) {
        return suggestion._highlightResult.text.value +
         "<div>" + suggestion._highlightResult.title.value + "</div>";
      },
      footer: function() {
        return "<span class='autocomplete-footer'><a href='https://community.algolia.com/jekyll-algolia/'>add search to your jekyll site</a></span>";
      }
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset) {
  window.location.href = suggestion.url
});
