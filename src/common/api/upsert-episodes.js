import connection from 'common/persistence/lovefield';

function upsertEpisodes({animeId, episodes}) {
  return connection.then((db) => {
    const episodeTbl = db.getSchema().table('Episode');
    const rows = episodes.map(({title, releasedAt, torrentLink}) => (
      episodeTbl.createRow({
        animeId,
        title,
        releasedAt,
        torrentLink,
      })
    ));

    return db.insertOrReplace().into(episodeTbl)
      .values(rows).exec();
  });
}

export default upsertEpisodes;
