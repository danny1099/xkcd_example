import algoliaSearch from 'algoliasearch/lite';

const client = algoliaSearch('Z3P5LZA6K2', '983a7085f021d421d43a214407a84cf4');
const index = client.initIndex('XKCD-EXAMPLE');

export async function getHitsByAlgoliaSearch(query) {
  return await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10,
  });
}
