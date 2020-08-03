/* lifecycle
DOMContentLoaded
load
beforeunload/unload
*/
function ready() {
    console.log('Document ready');
}


document.addEventListener('DOMContentLoaded', ready);

window.onload = function () {
    console.log('Done')

}

//exit
let analyticsData = {}

window.addEventListener('unload', function () {
    navigator.sendBeacon('/analytics', JSON.stringify(analyticsData))
})


// window.onbeforeunload = function () {
//     return 'You want exit?';
// };

/* readyState
loading
interactive
complete
 */


function work() {
    console.log('Working')
}

if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', work);
} else {
    // DOM is ready!
    work();
}

//readystatechange event
document.addEventListener('readystatechange', () => console.log(document.readyState));

/* defer
Scripts with defer never block the page.
Scripts with defer always execute when the DOM is ready, but before DOMContentLoaded event.
The defer attribute is only for external scripts

 */

//async
//Dynamic scripts behave as “async” by default.


/*

	    Order	                                    DOMContentLoaded
async	Load-first order. Their document            Irrelevant. May load and execute while the document has not yet
        order doesn’t matter – which loads first	been fully downloaded. That happens if scripts are small or
                                                    cached, and the document is long enough.
defer	Document order (as they go in               Execute after the document is loaded and parsed
        the document).	                            (they wait if needed), right before DOMContentLoaded.

 */


//Resource loading: onload and onerror
/*
onload – successful load
onerror – an error occurred
 */
let script = document.createElement('script');

// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

script.onload = function() {
    // the script creates a helper function "_"
    console.log(_); // the function is available
};

script = document.createElement('script');
script.src = "https://example.com/404.js"; // no such script
document.head.append(script);

script.onerror = function() {
    console.error("Error loading " + this.src); // Error loading https://example.com/404.js
};

/*
The load and error events also work for other resources,
basically for any resource that has an external src.
 */

/*
To allow cross-origin access, the <script> tag needs to have the crossorigin attribute, plus the remote server must provide special headers.

There are three levels of cross-origin access:

No crossorigin attribute – access prohibited.
crossorigin="anonymous" – access allowed if the server responds with
 the header Access-Control-Allow-Origin with * or our origin.
 Browser does not send authorization information and cookies to remote server.
crossorigin="use-credentials" – access allowed if the server sends
 back the header Access-Control-Allow-Origin with our origin and
 Access-Control-Allow-Credentials: true. Browser sends authorization information
 and cookies to remote server.
 */










