import Promise from 'bluebird';
import connection from 'storage/connection';

function upsertEpisodes({animeId, title, episodes}) {
  return connection.then((db) => {
    const table = db.getSchema().table('Episode');
    const rows = episodes.map(({label, releasedAt, torrentLink}) => (
      table.createRow({
        animeId,
        label,
        releasedAt,
        torrentLink,
      })
    ));

    return new Promise((resolve) => {
      db.insertOrReplace().into(table).values(rows)
        .exec().then(resolve);
    });
  });
}

export default upsertEpisodes;
