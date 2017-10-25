import lf from 'lovefield';

let schema = lf.schema.create('anime', 1);

schema.createTable('Anime')
  .addColumn('animeId', lf.Type.INTEGER)
  .addColumn('title', lf.Type.STRING)
  .addColumn('loaderKeyword', lf.Type.STRING)
  .addColumn('episodeLabelExtractor', lf.Type.STRING)
  .addPrimaryKey(['animeId'], /* autoIncrement = */ true);

schema.createTable('Episode')
  .addColumn('episodeId', lf.Type.INTEGER)
  .addColumn('animeId', lf.Type.INTEGER)
  .addColumn('label', lf.Type.STRING)
  .addColumn('torrentLink', lf.Type.STRING)
  .addColumn('releasedAt', lf.Type.DATE)
  .addPrimaryKey(['episodeId'], /* autoIncrement = */ true)
  .addUnique('uAnimeLabel', ['animeId', 'label'])
  .addForeignKey('fkAnimeId', {
    local: 'animeId',
    ref: 'Anime.animeId',
  });

export default schema.connect();
