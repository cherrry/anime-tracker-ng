import Promise from 'bluebird';
import connection from 'storage/connection';

function addNewAnime({title, loader: {filterKeywords, labelRegexp}}) {
  return connection.then((db) => {
    const table = db.getSchema().table('Anime');
    const row = table.createRow({
      title,
      filterKeywords,
      labelRegexp,
    });

    return new Promise((resolve) => {
      db.insert().into(table).values([row])
        .exec().then(resolve);
      });
  });
}

export default addNewAnime;
