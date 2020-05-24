var API_URL;
var getInputValue = "";
var giphyAPI_url = "https://api.giphy.com/v1/gifs/search?q=";
var giphyAPI_key = "&api_key=iIEYEKDe7MZtSMvnRckndkB3k3KKs5dP&limit=";
var getSearchNum = "";



const js_container = document.querySelector( '.js-container' );
const js_display_search = document.querySelector('.js-display-title');


function toJSON ( response ) {
    return response.json();
};


function processResponse ( content ) {
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
        <h2> Here are your <u>${getSearchNum} ${searchItem}</u> giphs. Enjoy!</h2>
    `;
}


function errorHandling() {
    js_display_search.innerHTML=`Sorry! Your Search Could Not Be Completed At This Time!`
    js_container.innerHTML = `
        Error loading data, make sure your network is on.
    `;
}

document.querySelector('.js-form').addEventListener('submit', inputLength);



function inputLength() {
    getInputValue = document.querySelector('#search').value.trim();
    getSearchNum = document.querySelector('#searchNum').value.trim();
    if (getInputValue.length===0) {
        alert("What would you like to search for?")
    } else {
        returnGiphs();
    }
}

function returnGiphs() {
    getInputValue = document.querySelector('#search').value.trim();
    getSearchNum = document.querySelector('#searchNum').value.trim();
    event.preventDefault();
    API_URL = giphyAPI_url + encodeURI(getInputValue) + giphyAPI_key + getSearchNum;
    displaySearch();
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );
    document.querySelector("#search").value="";
    document.querySelector("#searchNum").value="";
}