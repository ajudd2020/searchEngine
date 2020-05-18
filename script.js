var API_URL;
var getInputValue = ""; 
var giphyAPI_url = "http://api.giphy.com/v1/gifs/search?q=";
var giphyAPI_key = "&api_key=my24YYU5rkJZ8sXSdpisAvyoZCkxQQW0&limit=";
var getSearchNum = "";
API_URL = giphyAPI_url + getInputValue + giphyAPI_key + getSearchNum;



const js_container = document.querySelector( '.js-container' );

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

        markup = markup + `
            <div class="giphyBox">
                <img src = "${giphyImageURL}" />
            </div>
        `;
    }
    js_container.innerHTML = markup;
}

//                <div class="url"> URL: ${giphyURL} </div> 

function errorHandling() {
    js_container.innerHTML = `
        <li class="error">Error loading data, make sure your network is on.</li>
    `;
}

document.querySelector('.js-form').addEventListener('submit', returnGiphs);

function returnGiphs(event) {
    event.preventDefault();
    console.log(getInputValue);
    getInputValue = document.querySelector('#search').value; 
    getSearchNum = document.querySelector('#searchNum').value;
    API_URL = giphyAPI_url + getInputValue+ giphyAPI_key + getSearchNum;
    console.log( API_URL)
    fetch( API_URL )
        .then( toJSON )
        .then( processResponse )
        .catch( errorHandling );

}

/*fetch( API_URL )
    .then( toJSON )
    .then( processResponse )
    .catch( errorHandling );*/



 