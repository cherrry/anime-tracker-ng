import connection from 'storage/connection';

function animeList() {
  return connection.then((db) => {
    const table = db.getSchema().table('Anime');
    return db.select().from(table).exec();
  });
}

export default animeList;
