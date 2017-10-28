import animeListFromDb from 'storage/anime-list';

function animeList() {
  return animeListFromDb().then((animes) => {
    return animes.map(({animeId, title, filterKeywords, labelRegexp}) => ({
      animeId,
      title,
      loader: {
        filterKeywords,
        labelRegexp,
      },
    }));
  });
}

export default animeList;
