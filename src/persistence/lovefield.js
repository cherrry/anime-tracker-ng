import lf from 'lovefield';
import firebase from 'persistence/firebase';

let schema = lf.schema.create('anime', 1);

schema.createTable('Anime')
  .addColumn('animeId', lf.Type.INTEGER)
  .addColumn('title', lf.Type.STRING)
  .addColumn('filterKeywords', lf.Type.STRING)
  .addColumn('labelRegexp', lf.Type.STRING)
  .addPrimaryKey(['animeId'], /* autoIncrement = */ true);

schema.createTable('Episode')
  .addColumn('episodeId', lf.Type.INTEGER)
  .addColumn('animeId', lf.Type.INTEGER)
  .addColumn('title', lf.Type.STRING)
  .addColumn('torrentLink', lf.Type.STRING)
  .addColumn('releasedAt', lf.Type.DATE)
  .addPrimaryKey(['episodeId'], /* autoIncrement = */ true)
  .addUnique('uAnimeTitle', ['animeId', 'title'])
  .addForeignKey('fkAnimeId', {
    local: 'animeId',
    ref: 'Anime.animeId',
  });

export default schema.connect({
  storeType: lf.schema.DataStoreType.FIREBASE,
  firebase: firebase.database().ref(),
});
