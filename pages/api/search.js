import algoliaSearch from 'algoliasearch/lite';

const client = algoliaSearch('Z3P5LZA6K2', '983a7085f021d421d43a214407a84cf4');
const index = client.initIndex('XKCD-EXAMPLE');

export default async function handler(req, res) {
  const query = req.query.q;

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10,
  });

  return res.status(200).json(hits);
}
