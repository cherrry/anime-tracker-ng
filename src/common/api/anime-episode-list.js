/* eslint-disable */
import Promise from 'bluebird';
import _ from 'lodash';

import animeList from 'common/api/anime-list';
import connection from 'common/persistence/lovefield';

function animeEpisodeList() {
  return Promise.all([animeList(), connection])
    .then((args) => {
      const animeList = args[0];
      const db = args[1];

      const episodeTbl = db.getSchema().table('Episode');
      const episodeList = db.select()
        .from(episodeTbl)
        .where(episodeTbl.animeId.in(animeList.map(({animeId}) => animeId)))
        .exec();
      return Promise.all([animeList, episodeList]);
    }).then((args) => {
      const animeList = args[0];
      const episodesByAnimeId = _.groupBy(args[1], 'animeId');

      return animeList.map((anime) => _.assign({}, anime, {
        episodes: episodesByAnimeId.hasOwnProperty(anime.animeId)
        ? episodesByAnimeId[anime.animeId] : [],
      }));
    });
}

export default animeEpisodeList;
