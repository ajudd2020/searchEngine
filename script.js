var API_URL;
var getInputValue = "";
var giphyAPI_url = "http://api.giphy.com/v1/gifs/search?q=";
var giphyAPI_key = "&api_key=my24YYU5rkJZ8sXSdpisAvyoZCkxQQW0&limit=";
var getSearchNum = "";
API_URL = giphyAPI_url + getInputValue + giphyAPI_key + getSearchNum;

const js_container = document.querySelector( '.js-container' );
const js_display_search = document.querySelector('.js-display-title');

function toJSON ( response ) {
    console.log( response );
    return response.json();
};

function processResponse ( content ) {
    console.log( content );
    let markup = '';
    for (const gif of content.data) {

        let giphyURL = gif.url;
        let giphyImageURL = gif.images.fixed_width.url;
        let giphyAltText = gif.title;

        markup = markup + `
            <div class="giphyBox">
                <a href="${giphyURL}" target="_blank"> <img src = "${giphyImageURL}" alt="${giphyAltText}" /></a>
            </div>
        `;
    }
    js_container.innerHTML = markup;
}

function displaySearch() {
    let searchItem = getInputValue.charAt(0).toUpperCase() + getInputValue.slice(1);
    js_display_search.innerHTML = `
        <h2> Here are your ${getSearchNum} ${searchItem} giphs. Enjoy!</h2>
    `;
}

function errorHandling() {
    js_container.innerHTML = `
        <li class="error">Error loading data, make sure your network is on.</li>
    `;
}

document.querySelector('.js-form').addEventListener('submit', returnGiphs);

function returnGiphs(event) {
    event.preventDefault();
    getInputValue = document.querySelector('#search').value;
    getSearchNum = document.querySelector('#searchNum').value;
    API_URL = giphyAPI_url + getInputValue+ giphyAPI_key + getSearchNum;
    console.log( API_URL);
    displaySearch();
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );
    document.querySelector("#search").value="";
    document.querySelector("#searchNum").value="";
}
