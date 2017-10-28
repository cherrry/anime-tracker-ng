import animeListFromDb from 'storage/anime-list';

function animeList() {
  return animeListFromDb().then((animes) => {
    return animes.map(({title, filterKeywords, labelRegexp}) => ({
      title,
      loader: {
        filterKeywords,
        labelRegexp,
      },
    }));
  });
}

export default animeList;
