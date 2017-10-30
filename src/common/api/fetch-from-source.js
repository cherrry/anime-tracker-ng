function fetchXmlDocument(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((xmlText) => {
      let domParser = new DOMParser();
      return domParser.parseFromString(xmlText, 'text/xml');
    });
}

function getTitle(item) {
  let elem = item.querySelector('title');
  return elem.textContent;
}

function getReleasedAt(item) {
  let elem = item.querySelector('pubDate');
  return new Date(elem.textContent);
}

function getTorrentLink(item) {
  let elem = item.querySelector('enclosure');
  return elem.getAttribute('url') || '';
}

function fetchFromSource({animeId, title, filterKeywords}, limit=15) {
  return fetchXmlDocument(`https://share.dmhy.org/topics/rss/rss.xml?keyword=${filterKeywords}`)
    .then((doc) => {
      let latestAnimes = {
        animeId,
        title,
        episodes: [],
      };

      let items = doc.querySelectorAll('item');
      for (let i = 0; i < limit && i < items.length; ++i) {
        const item = items[i];
        latestAnimes.episodes.push({
          title: getTitle(item),
          releasedAt: getReleasedAt(item),
          torrentLink: getTorrentLink(item),
        });
      }
      return latestAnimes;
    });
}

export default fetchFromSource;
