//establish needed variables and constants
var API_URL;
var getInputValue = "";
var giphyAPI_url = "https://api.giphy.com/v1/gifs/search?q=";
var giphyAPI_key = "&api_key=iIEYEKDe7MZtSMvnRckndkB3k3KKs5dP&limit=";
var getSearchNum = "";
//API_URL = giphyAPI_url + encoded + giphyAPI_key + getSearchNum;


const js_container = document.querySelector( '.js-container' );
const js_display_search = document.querySelector('.js-display-title');

//Convert To JSON
function toJSON ( response ) {
    console.log( response );
    return response.json();
};

//Process JSON response
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

//Display Search Criteria at top of page so when the search clears out the user will still see their parameters
function displaySearch() {
    let searchItem = getInputValue.charAt(0).toUpperCase() + getInputValue.slice(1);
    js_display_search.innerHTML = `
        <h2> Here are your <u>${getSearchNum} ${searchItem}</u> giphs. Enjoy!</h2>
    `;
}

//Error handling
function errorHandling() {
    js_display_search.innerHTML=`Sorry! Your Search Could Not Be Completed At This Time!`
    js_container.innerHTML = `
        Error loading data, make sure your network is on.
    `;
}

document.querySelector('.js-form').addEventListener('submit', inputLength);



function inputLength(event) {
    getInputValue = document.querySelector('#search').value.trim();
    console.log(getInputValue);
    getSearchNum = document.querySelector('#searchNum').value.trim();
    if (getInputValue.length===0) {
        alert("What would you like to search for?")
    } else {
        returnGiphs();
    }
}

function returnGiphs() {
    getInputValue = document.querySelector('#search').value.trim();
    console.log(getInputValue);
    getSearchNum = document.querySelector('#searchNum').value.trim();
    event.preventDefault();
    API_URL = giphyAPI_url + encodeURI(getInputValue) + giphyAPI_key + getSearchNum;
    console.log( API_URL);
    displaySearch();
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );
    document.querySelector("#search").value="";
    document.querySelector("#searchNum").value="";
}


//run returnGiphs function, prevent default, and clear out search fields without reloading page on submit
//MY ORIGINAL CODE THAT WORKS!!!! 
/*function returnGiphs(event) {
    event.preventDefault();
    getInputValue = document.querySelector('#search').value.trim();
    console.log(getInputValue);
    getSearchNum = document.querySelector('#searchNum').value.trim();
    API_URL = giphyAPI_url + encodeURI(getInputValue) + giphyAPI_key + getSearchNum;
    console.log( API_URL);
    displaySearch();
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );
    document.querySelector("#search").value="";
    document.querySelector("#searchNum").value="";
}*/