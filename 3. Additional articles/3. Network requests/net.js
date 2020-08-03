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


