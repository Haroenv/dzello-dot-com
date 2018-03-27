import atomicAlgolia from 'atomic-algolia';
import algoliasearch from 'algoliasearch';

export default {
  pushData: (indexName, indexFile) => {
    return new Promise((resolve, reject) => {
      atomicAlgolia(indexName, indexFile, (error, result) => {
        if (error)
          reject(error);
        else
          resolve(result);
      });
    });
  },
  setSettings: (appId, adminApiKey, indexName) => {
    var client = algoliasearch(appId, adminApiKey);
    var index = client.initIndex(indexName);
    return index.setSettings({
      searchableAttributes: ['unordered(title)', 'unordered(content)'],
      customRanking: ['desc(date)'],
      attributesToHighlight: ['title', 'content'],
      attributesToSnippet: ['content: 20'],
      snippetEllipsisText: "…",
      attributesForFaceting: ['type', 'kind', 'section', 'draft']
    });
  }
}
