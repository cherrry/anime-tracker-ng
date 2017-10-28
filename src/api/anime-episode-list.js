import animeEpisodeListFromDb from 'storage/anime-episode-list';

function animeEpisodeList() {
  return animeEpisodeListFromDb().then((animeEpisodes) => {
    let animeMap = {};
    let animeList = [];

    animeEpisodes.forEach(({Anime, Episode}) => {
      if (!animeMap.hasOwnProperty(Anime.animeId)) {
        let anime = {
          animeId: Anime.animeId,
          title: Anime.title,
          loader: {
            filterKeywords: Anime.filterKeywords,
            labelRegexp: Anime.labelRegexp,
          },
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
