import connection from 'persistence/lovefield';

function addNewAnime({title, filterKeywords, labelRegexp}) {
  return connection.then((db) => {
    const animeTbl = db.getSchema().table('Anime');
    const row = animeTbl.createRow({
      title,
      filterKeywords,
      labelRegexp,
    });

    return db.insert().into(animeTbl)
      .values([row]).exec();
  });
}

export default addNewAnime;
