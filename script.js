var API_URL;
var getInputValue = "";
var giphyAPI_url = "https://api.giphy.com/v1/gifs/search?q=";
var giphyAPI_key = "&api_key=iIEYEKDe7MZtSMvnRckndkB3k3KKs5dP&limit=";
var getSearchNum = "";
var searchItem = "";



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
    if (getInputValue.includes("%20")) {
        var searchItemDecoded = getInputValue.split("%20").join(" ");
        js_display_search.innerHTML = `
        <h2> Here are your <u>${getSearchNum} ${searchItemDecoded}</u> giphs. Enjoy!</h2>
    `;
    } else {
        js_display_search.innerHTML = `
        <h2> Here are your <u>${getSearchNum} ${getInputValue}</u> giphs. Enjoy!</h2>
    `;
    }
}


/*function displaySearch() {
    if (getInputValue.includes("%20")) {
        var searchItemDecoded = getInputValue.replaceAll("%20", " ");
        console.log(searchItemDecoded);
        js_display_search.innerHTML = `
        <h2> Here are your <u>${getSearchNum} ${searchItemDecoded}</u> giphs. Enjoy!</h2>
    `;
    } else {
        js_display_search.innerHTML = `
        <h2> Here are your <u>${getSearchNum} ${getInputValue}</u> giphs. Enjoy!</h2>
    `;
    }
}*/


function errorHandling() {
    js_display_search.innerHTML= `
        Sorry! Your search could not be completed at this time.
    `;

    js_container.innerHTML = `
        Please check your network connection and try again.
    `;
}

document.querySelector('.js-form').addEventListener('submit', inputLength);



function inputLength() {
    getInputValue = encodeURIComponent(document.querySelector('#search').value.trim());
    getSearchNum = document.querySelector('#searchNum').value.trim();
    if (getInputValue.length===0) {
        event.preventDefault();
        alert("Please enter a search.")
    } else if (getSearchNum.length===0) {
        event.preventDefault();
        alert("Please enter a number")
    } else {
        returnGiphs();
    }
}

function returnGiphs() {
    event.preventDefault();
    API_URL = giphyAPI_url + getInputValue + giphyAPI_key + getSearchNum;
    displaySearch();
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );
    document.querySelector("#search").value="";
    document.querySelector("#searchNum").value="";
}