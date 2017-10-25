function fetchXmlDocument(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((xmlText) => {
      let domParser = new DOMParser();
      return domParser.parseFromString(xmlText, 'text/xml');
    });
}

function getTitle(item, labelRegExp) {
  let elem = item.querySelector('title');
  let text = elem.textContent;
  let match = (new RegExp(labelRegExp)).exec(text);
  return match[1];
}

function getReleasedAt(item) {
  let elem = item.querySelector('pubDate');
  return new Date(elem.textContent);
}

function getTorrentLink(item) {
  let elem = item.querySelector('enclosure');
  return elem.getAttribute('url') || '';
}

function fetchFromSource(config, limit=15) {
  let {loaderKeyword, labelRegExp} = config.loader;
  return fetchXmlDocument(`https://share.dmhy.org/topics/rss/rss.xml?keyword=${loaderKeyword}`)
    .then((doc) => {
      let latestAnimes = {
        animeId: config.animeId || null,
        title: config.title,
        episodes: [],
      };

      let items = doc.querySelectorAll('item');
      items.slice(0, limit).forEach((item) => {
        latestAnimes.episodes.push({
          title: getTitle(item, labelRegExp),
          releasedAt: getReleasedAt(item),
          torrentLink: getTorrentLink(item),
        });
      });

      return latestAnimes;
    });
}

export default fetchFromSource;
