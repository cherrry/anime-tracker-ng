import fetchFromSource from 'api/fetch-from-source';
import upsertEpisodes from 'api/upsert-episodes';

function updateAnimeEpisodes(anime) {
  return fetchFromSource(anime).then(upsertEpisodes);
}

export default updateAnimeEpisodes;
