//get cookie
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

console.log(getCookie('user'));

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // add other defaults here if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

// Example of use:
setCookie('user', 'John', {secure: true, 'max-age': 3600});


console.log(getCookie('user'));

/*
Summary
document.cookie provides access to cookies

write operations modify only cookies mentioned in it.
name/value must be encoded.
one cookie up to 4kb, 20+ cookies per site (depends on a browser).
Cookie options:

path=/, by default current path, makes the cookie visible only under that path.
domain=site.com, by default a cookie is visible on current domain only, if set
 explicitly to the domain, makes the cookie visible on subdomains.
expires or max-age sets cookie expiration time, without them the cookie dies when the browser is closed.
secure makes the cookie HTTPS-only.
samesite forbids the browser to send the cookie with requests coming from
 outside the site, helps to prevent XSRF attacks.
 */


/*
Web storage objects localStorage and sessionStorage allow to store key/value in the browser.

Both key and value must be strings.
The limit is 5mb+, depends on the browser.
They do not expire.
The data is bound to the origin (domain/port/protocol).

localStorage
Shared between all tabs and windows with the same origin
Survives browser restart

sessionStorage
Visible within a browser tab, including iframes from the same origin
Survives page refresh (but not tab close)

setItem(key, value) – store key/value pair.
getItem(key) – get the value by key.
removeItem(key) – remove the key with its value.
clear() – delete everything.
key(index) – get the key number index.
length – the number of stored items.
Use Object.keys to get all keys.
We access keys as object properties, in that case storage event isn’t triggered.


Triggers on setItem, removeItem, clear calls.
Contains all the data about the operation (key/oldValue/newValue), the document url and the storage object storageArea.
Triggers on all window objects that have access to the storage except the one that generated it
(within a tab for sessionStorage, globally for localStorage).
 */


//Task autosave
let area = document.getElementById('area');

area.value = localStorage.getItem('savedData') || '';
area.oninput = () => localStorage.setItem('savedData', area.value);


//end task


//IndexedDB

//create
// let openRequest = indexedDB.open(name, version);
let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function () {
    // triggers if the client had no database
    // ...perform initialization...
};

openRequest.onerror = function () {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
    let db = openRequest.result;
    // continue to work with database using db object

    db.createObjectStore('books', {keyPath: 'id'});
};
/*
store.get(query) – search for the first value by a key or a range.
store.getAll([query], [count]) – search for all values, limit by count if given.
store.getKey(query) – search for the first key that satisfies the query, usually a range.
store.getAllKeys([query], [count]) – search for all keys that satisfy the query, usually a range, up to count if given.
store.count([query]) – get the total count of keys that satisfy the query, usually a range.
 */


/*
Get a promise wrapper like idb.
Open a database: idb.openDb(name, version, onupgradeneeded)
Create object storages and indexes in onupgradeneeded handler or perform version update if needed.
For requests:
Create transaction db.transaction('books') (readwrite if needed).
Get the object store transaction.objectStore('books').
Then, to search by a key, call methods on the object store directly.
To search by an object field, create an index.
If the data does not fit in memory, use a cursor.
 */


