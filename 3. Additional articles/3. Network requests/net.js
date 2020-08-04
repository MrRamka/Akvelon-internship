//fetch
/*
First, the promise, returned by fetch, resolves with an object of the
 built-in Response class as soon as the server responds with headers.
 */

/*
response.text() – read the response and return as text,
response.json() – parse the response as JSON,
response.formData() – return the response as FormData object (explained in the next chapter),
response.blob() – return the response as Blob (binary data with type),
response.arrayBuffer() – return the response as ArrayBuffer (low-level representaion of binary data),
additionally, response.body is a ReadableStream object, it allows you
to read the body chunk-by-chunk, we’ll see an example later.
 */

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
    .then(response => response.json())
    .then(commits => console.log(commits[0].author.login));

async function test() {
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

    console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

    console.log('All headers')
    for (let [key, value] of response.headers) {
        console.log(`${key} = ${value}`);
    }
}

test();

/*
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
 */
async function f() {
    let user = {
        name: 'John',
        surname: 'Smith'
    };

    let response = await fetch('url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        let result = await response.json();
        console.log(result.message);
    } else {
        console.log(response.status);
    }
}

f();

/*
Fetch options so far:

method – HTTP-method,
headers – an object with request headers (not any header is allowed),
body – the data to send (request body) as string, FormData, BufferSource, Blob or UrlSearchParams object.
 */

async function getUsers(names) {
    let jobs = [];

    for (let name of names) {
        let job = fetch(`https://api.github.com/users/${name}`).then(
            successResponse => {
                if (successResponse.status !== 200) {
                    return null;
                } else {
                    return successResponse.json();
                }
            },
            failResponse => {
                return null;
            }
        );
        jobs.push(job);
    }
    return await Promise.all(jobs);
}

let users = getUsers(['iliakan', 'remy', 'no.such.users']);

users.then(result => console.log(result));


//FormData uses Content-Type: form/multipart

//let formData = new FormData([form]);
let formElem = document.getElementById('formElem');
formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('url', {
        method: 'POST',
        body: new FormData(formElem)
    });

    let result = await response.json();

    console.log(result.message);
};

/*
formData.append(name, value) – add a form field with the given name and value,
formData.append(name, blob, fileName) – add a field as if it were <input type="file">,
the third argument fileName sets file name (not form field name), as it were a name of the file in user’s filesystem,
formData.delete(name) – remove the field with the given name,
formData.get(name) – get the value of the field with the given name,
formData.has(name) – if there exists a field with the given name, returns true, otherwise false

Also .set removes all fields with the given name, and then appends a new
formData.set(name, value),
formData.set(name, blob, fileName).
 */


async function f1() {
// Step 1: start the fetch and obtain a reader
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

    const reader = response.body.getReader();

// Step 2: get total length
    const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while (true) {
        const {done, value} = await reader.read();

        if (done) {
            break;
        }

        chunks.push(value);
        receivedLength += value.length;

        console.log(`Received ${receivedLength} of ${contentLength}`)
    }

// Step 4: concatenate chunks into single Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position); // (4.2)
        position += chunk.length;
    }

// Step 5: decode into a string
    let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
    let commits = JSON.parse(result);
    console.log(commits[0].author.login);
}

// f1();
//Fetch: Abort
async function f2() {
    let controller = new AbortController();


    setTimeout(() => controller.abort(), 400);

    try {
        let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100', {
            signal: controller.signal
        });
        console.log(`status ${response.status}`);
    } catch (err) {
        if (err.name === 'AbortError') { // handle abort()
            console.log("Aborted!");
        } else {
            throw err;
        }
    }

}

f2();
//AbortController is scalable, it allows to cancel multiple fetches at once.

/*
let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from elsewhere,
// it aborts all fetches
 */

/*
listen to abort event
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob


 */

//fetch api
let url = '';
let promise = fetch(url, {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
        // the content type header value is usually auto-set
        // depending on the request body
        "Content-Type": "text/plain;charset=UTF-8"
    },
    body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
    referrer: "about:client", // or "" to send no Referer header,
    // or an url from the current origin
    referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
    mode: "cors", // same-origin, no-cors
    credentials: "same-origin", // omit, include
    cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
    redirect: "follow", // manual, error
    integrity: "", // a hash, like "sha256-abcdef1234567890"
    keepalive: false, // true
    signal: undefined, // AbortController to abort request
    window: window // null
});


//new URL(url, [base])

url = new URL('https://google.com')
url = new URL('https://javascript.info/url');

console.log(url.protocol); // https:
console.log(url.host);     // javascript.info
console.log(url.pathname); // /url

/*
params
append(name, value) – add the parameter by name,
delete(name) – remove the parameter by name,
get(name) – get the parameter by name,
getAll(name) – get all parameters with the same name (that’s possible, e.g. ?user=John&user=Pete),
has(name) – check for the existence of the parameter by name,
set(name, value) – set/replace the parameter,
sort() – sort parameters by name, rarely needed,
 */

url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // added parameter with a space and !

console.log(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

// parameters are automatically encoded
console.log(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay


// encodeURI
// encodeURI(Rock&Roll)
// Rock&Roll
//
// encodeURIComponent
// encodeURIComponent('Rock&Roll')
// Rock%26Roll

//XMLHttpRequest
//create
let xhr = new XMLHttpRequest();

//init
// xhr.open(method, URL, [async, user, password])

//send
//xhr.send([body])
xhr.onload = function () {
    console.log(`Loaded: ${xhr.status} ${xhr.response}`);
};

xhr.onerror = function () { // only triggers if the request couldn't be made at all
    console.log(`Network Error`);
};

xhr.onprogress = function (event) { // triggers periodically
    // event.loaded - how many bytes downloaded
    // event.lengthComputable = true if the server sent Content-Length header
    // event.total - total number of bytes (if lengthComputable)
    console.log(`Received ${event.loaded} of ${event.total}`);
};

/*
Response Type
We can use xhr.responseType property to set the response format:

"" (default) – get as string,
"text" – get as string,
"arraybuffer" – get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays),
"blob" – get as Blob (for binary data, see chapter Blob),
"document" – get as XML document (can use XPath and other XML methods),
"json" – get as JSON (parsed automatically).
 */

/*
STATES

UNSENT = 0; // initial state
OPENED = 1; // open called
HEADERS_RECEIVED = 2; // response headers received
LOADING = 3; // response is loading (a data packed is received)
DONE = 4; // request complete
 */


xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
        // loading
    }
    if (xhr.readyState === 4) {
        // request finished
    }
};
xhr.abort(); // terminate the request


//set header
// xhr.setRequestHeader('Content-Type', 'application/json');


/*
 setRequestHeader(name, value)
 getResponseHeader(name)
 getAllResponseHeaders() without Set-Cookie and Set-Cookie2


 */
//get headers as object
let headers = xhr
    .getAllResponseHeaders()
    .split('\r\n')
    .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
    }, {});

// headers['Content-Type'] = 'image/png'

/*
loadstart – the request has started.
progress – a data packet of the response has arrived, the whole response body at the moment is in response.
abort – the request was canceled by the call xhr.abort().
error – connection error has occurred, e.g. wrong domain name. Doesn’t happen for HTTP-errors like 404.
load – the request has finished successfully.
timeout – the request was canceled due to timeout (only happens if it was set).
loadend – triggers after load, error, timeout or abort.
 */

//WebSocket

// let socket = new WebSocket("ws://javascript.info");

let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
};

socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
};

/*
WebSocket .send() method can send either text or binary data.
 */

//socket.close([code], [reason]); //close socket


/* STATES
0 – “CONNECTING”: the connection has not yet been established,
1 – “OPEN”: communicating,
2 – “CLOSING”: the connection is closing,
3 – “CLOSED”: the connection is closed.
 */


//Server Sent Events

/*

WebSocket	                        EventSource
Bi-directional: both client
and server can exchange messages	One-directional: only server sends data
Binary and text data	            Only text
WebSocket protocol	                Regular HTTP
 */

/*
EventSource object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:

Automatic reconnect, with tunable retry timeout.
Message ids to resume events, the last received identifier is sent in Last-Event-ID header upon reconnection.
The current state is in the readyState property.
 */

//create
// let source = new EventSource(url, [credentials]);

/*
STATES
readyState
The current connection state: either
EventSource.CONNECTING (=0),
EventSource.OPEN (=1),
EventSource.CLOSED (=2).
 */


/*
-close() close connection
 */

/*
Events
message
Message received, the data is in event.data.
open
The connection is established.
error
In case of an error, including both lost connection (will auto-reconnect)
and fatal errors. We can check readyState to see if the reconnection is being attempted.
The server may set a custom event name in event:. Such events
should be handled using addEventListener, not on<event>.
 */

/*
Server response format
The server sends messages, delimited by \n\n.

A message may have following fields:

data: – message body, a sequence of multiple data is interpreted as a single message, with \n between the parts.
id: – renews lastEventId, sent in Last-Event-ID on reconnect.
retry: – recommends a retry delay for reconnections in ms. There’s no way to set it from JavaScript.
event: – event name, must precede data:.
 */

