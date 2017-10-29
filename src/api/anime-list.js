import connection from 'persistence/lovefield';

function animeList() {
  return connection.then((db) => {
    const animeTbl = db.getSchema().table('Anime');
    return db.select().from(animeTbl).exec();
  }).then((animes) => {
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
