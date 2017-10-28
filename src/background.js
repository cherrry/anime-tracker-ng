import animeList from 'api/anime-list';
import updateAnimeEpisodes from 'background/update-anime-episodes';

animeList().then((animes) => {
  animes.forEach((anime) => {
    updateAnimeEpisodes(anime);
  });
});
