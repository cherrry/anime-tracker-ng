import connection from 'storage/connection';

function animeEpisodeList() {
  return connection.then((db) => {
    const anime = db.getSchema().table('Anime');
    const episode = db.getSchema().table('Episode');

    return db.select()
      .from(anime)
      .innerJoin(episode, anime.animeId.eq(episode.animeId))
      .groupBy(anime.animeId)
      .exec();
  });
}

export default animeEpisodeList;
