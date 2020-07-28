'use strict';


// callbacks
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`Script ${script.src} loaded`);
});


//promises https://www.youtube.com/watch?v=XD1MKx7eIuQ
/*
3 states
pending
fulfilled - resolve
rejected - reject
 */

let p = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done"), 1000);
});

p.then(data => {
    console.log(data);
});

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            name: "John",
            username: "joo"
        }
        resolve(data);
    }, 2000)
});

promise.then(data => {
    console.log("Data received");
});

//catch() - reject
//finally()

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))

//Thenables

//catch handles errors in promises of all kinds:
// be it a reject() call, or an error thrown in a handler.

//wait first completed promise
//and get result or error of this promise
Promise.race([p, promise])
    .then(() => {
        console.log("First promise");
    });

//wait all promises
//If any of the promises is rejected, the promise returned by
//Promise.all immediately rejects with that error
Promise.all([p, promise])
    .then(() => {
        console.log("All promises");
    });

/*
Promise.allSettled just waits for all promises to
settle, regardless of the result. The resulting array has:

{status:"fulfilled", value:result} for successful responses,
{status:"rejected", reason:error} for errors.
 */


//Polyfill if browser does not support Promise.allSettled()
if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            status: 'fulfilled',
            value
        }), reason => ({
            status: 'rejected',
            reason
        }))));
    };
}

//Promise.resolve(value) – makes a resolved promise with the given value.
//Promise.reject(error) – makes a rejected promise with the given error.


//Promisification
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // our custom callback for f
                if (err) {
                    reject(err);
                } else {
                    // resolve with all callback results if manyArgs is specified
                    resolve(manyArgs ? results : results[0]);
                }
            }

            args.push(callback);

            f.call(this, ...args);
        });
    };
}

/*
Promise handling is always asynchronous, as all promise actions pass through
the internal “promise jobs” queue, also called “microtask queue” (ES8 term).

So .then/catch/finally handlers are always called after the current code is finished.

If we need to guarantee that a piece of code is executed after
 .then/catch/finally, we can add it into a chained .then call.
*/

// Async functions
async function asyncFunction() {
    // works only inside async functions
    //The keyword await makes JavaScript wait until that promise settles and returns its result.
    //let value = await promise;

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Async data"), 1000)
    });

    return await promise;
}

asyncFunction().then(data => console.log(data));

//async ensures that the function returns a promise


//await accepts “thenables”

/*
Task Rewrite using async/await
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404

 */

async function loadJson(url) {
    let response = await fetch(url);
    if (response.status === 200) {
        return await response.json();
    }
    throw new Error(response.status);
}

loadJson('https://jsonplaceholder.typicode.com/todos/1')
    .catch(err => console.log(err)); // Error: 404
//end task

/*
task
 async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
 */

async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f() {
    wait().then(data => console.log(data));
}
f();







