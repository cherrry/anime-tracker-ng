import upsertEpisodesToDb from 'storage/upsert-episodes';

function upsertEpisodes(anime) {
  return upsertEpisodesToDb(anime);
}

export default upsertEpisodes;
