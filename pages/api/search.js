import { getHitsByAlgoliaSearch } from 'services/algoliaService';

export default async function handler(req, res) {
  const query = req.query.q;

  const { hits } = await getHitsByAlgoliaSearch(query);

  return res.status(200).json(hits);
}
