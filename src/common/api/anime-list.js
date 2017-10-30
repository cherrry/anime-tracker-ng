import connection from 'common/persistence/lovefield';

function animeList() {
  return connection.then((db) => {
    const animeTbl = db.getSchema().table('Anime');
    return db.select().from(animeTbl).exec();
  });
}

export default animeList;
