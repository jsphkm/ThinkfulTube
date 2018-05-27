'use strict';

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function watchSubmit(){
  $('.search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.queryinput');
    const query = queryTarget.val();
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyB3mmIO5hfph8WKH1eThqT_R7FCdaHFMes',
      q: `${searchTerm}`,
      maxResults: 50
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => generateResultElements(item));
  $('main').prop('hidden', false);
  $('.search-results').html(generateResultContainer());
  $('.resultlisting').html(results);
}

function generateResultContainer(){
  return `
    <div class='resultcontainer'>
      <div class='foundwrapper'>
        <h1>
          Found 50 results
        </h1>
      </div>
      <div class='resultlisting'>
      </div>
    </div>

  `
}

function generateResultElements(result) {
  console.log(result);
  return `
    <div class='eachresults'>
      <div class='resultimagecontainer'>
        <a class='thumbnaillink' href='http://www.youtube.com/watch?v=${result.id.videoId}'>
          <img class='thumbnailimg' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}'/>
        </a>
      </div>
      <div class='resultinfocontainer'>
        <h2>
          <div class='videoTitle'>
            <a class='videoTitlelink' href='http://www.youtube.com/watch?v=${result.id.videoId}' aria-label='${result.snippet.title}' title='${result.snippet.title}'>
              ${result.snippet.title}
            </a>
          </div>
        </h2>
        <div class='channelTitle'>
          <a class='channelTitlelink' href='http://www.youtube.com/channel/${result.snippet.channelId}' aria-label='${result.snippet.channelTitle}'>
            ${result.snippet.channelTitle}
          </a>
        </div>
        <div class='videoDescription'>
          <a class='videoDescriptionlink' href='http://www.youtube.com/watch?v=${result.id.videoId}' aria-label='${result.snippet.description}'>
            ${result.snippet.description}
          </a>
        </div>
      </div>
    </div>
  `;
}

function load_master(){
   $("input:text:visible:first").focus();
   watchSubmit();
}

$(load_master);
