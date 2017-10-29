import connection from 'persistence/lovefield';

function animeEpisodeList() {
  return connection.then((db) => {
    const animeTbl = db.getSchema().table('Anime');
    const episodeTbl = db.getSchema().table('Episode');

    return db.select()
      .from(animeTbl)
      .innerJoin(episodeTbl, animeTbl.animeId.eq(episodeTbl.animeId))
      .groupBy(animeTbl.animeId)
      .exec();
  }).then((animeEpisodes) => {
    let animeMap = {};
    let animeList = [];

    animeEpisodes.forEach(({Anime, Episode}) => {
      if (!animeMap.hasOwnProperty(Anime.animeId)) {
        let anime = {
          animeId: Anime.animeId,
          title: Anime.title,
          filterKeywords: Anime.filterKeywords,
          labelRegexp: Anime.labelRegexp,
          episodes: [],
        };
        animeMap[Anime.animeId] = anime;
        animeList.push(anime);
      }

      let anime = animeMap[Anime.animeId];
      anime.episodes.push(Episode);
    });
    return animeList;
  });
}

export default animeEpisodeList;
