//Map
let map = new Map();
map.set("key", "val");
console.log(map.get("key")); //undefined or value

console.log(map.has("testKey")); //true or false

map.delete("key");
map.clear();
console.log(map.size);

let john = {name: "John"};
map.set(john, john.name); //key can be an object
console.log(map.get(john))

//map is chaining
map.set("1", "1").set("2", 2);

//iteration
console.log(map.keys());
console.log(map.values());
console.log(map.entries()); //pair of key value

/*
map.forEach((value, key, map) => {

});
*/
//from iterable to map
// array of [key, value] pairs
let map1 = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);
//from object to map
let obj = {
    name: "John",
    age: 30
};
//Object.entries(obj)
let map2 = new Map(Object.entries(obj));
console.log(map2.entries());

//Object.fromEntries from pair of key-value to object

//Set
let set = new Set();
set.add("1");
set.add("2");
set.has("2");
set.delete("1");
set.clear();
set.size


//Iteration over Set
// for(in)
/*
set.forEach((value, valueAgain, set) => {

});
 */
//set.keys()
//set.values() same keys() for compatibility with Map
//set.entries() [value, value] for compatibility with Map


//Task Filter unique array members
function unique(arr) {
    return new Set(arr);
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log(unique(values));
//end task


//task Filter anagrams
function aclean(array) {
    let newArray = [];
    let mapWord = new Map();
    //get map key = sorted letters in word, value = word
    array.forEach((item) => {
        let sortedWord = item.toLowerCase().split('').sort().join('');
        mapWord.set(sortedWord, item);
    });
    //get unique sorted letters
    let uniqueWord = new Set(mapWord.keys());

    uniqueWord.forEach((value => {
        newArray.push(mapWord.get(value));
    }));

    return newArray;
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log(aclean(arr));
//end Task


// WeakMap
// keys only objects
// Now if john only exists as the key of WeakMap – it will be automatically deleted from the map (and memory).
let weakMap = new WeakMap();
weakMap.set(john, john.name);
weakMap.get(john);
weakMap.delete(john);
weakMap.has(john);

//WeakMap is Map-like collection that allows only
// objects as keys and removes them together with
// associated value once they become inaccessible by other means.

// WeakSet is Set-like collection that stores only
// objects and removes them once they become inaccessible by other means.


// Object.keys, values, entries
/*
Object.keys(obj) – returns an array of keys.
Object.values(obj) – returns an array of values.
Object.entries(obj) – returns an array of [key, value] pairs.
 */
let user = {
    name: "John",
    age: 30
};
console.log(Object.values(user));
console.log(Object.keys(user));
console.log(Object.entries(user));

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    //entries -> arr -> map from array -> fromEntries (create obj again)
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

console.log(doublePrices.meat); // 8

//task Sum the properties
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSalaries(salaries) {
    let sal = Object.values(salaries);
    return sal.reduce(function (sum, item) {
        return sum + Number(item);
    }, 0);
}

console.log(sumSalaries(salaries));

//endTask

//task count object properties
user = {
    name: 'John',
    age: 30
};

function count(object) {
    return Object.keys(object).length;
}

console.log(count(user));

//end task

//Destructuring assignment

//Array destructuring

// we have an array with the name and surname
arr = ["Ilya", "Kantor"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
// let [firstName, surname] = arr;

// second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(title);

//any iterable
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

let guest = "Jane";
let admin = "Pete";

// Swap values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];


//rest ...

let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1); // Julius
console.log(name2); // Caesar

// Note that type of `rest` is Array.
console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2


// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

console.log(name);    // Julius (from array)
console.log(surname); // Anonymous (default used)

//Object destructuring

let options = {
    title1: "Menu",
    width: 100,
    height: 200
};

let {title1, width, height} = options;

console.log(title1);  // Menu
console.log(width);  // 100
console.log(height); // 200


//let {prop : varName = default, ...rest} = object
//let [item1 = default, item2, ...rest] = array


//date
let date = new Date();
// 0 means 01.01.1970 UTC+0
date = new Date(0);
//new Date(year, month, date, hours, minutes, seconds, ms)
//getFullYear()
// getMonth() 1 -> 11
// getDate()
//getDay() 0 - sunday


//Autocorrection
date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date); // ...is 1st Feb 2013!

//zero and negative
date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
console.log(date);

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
console.log(date); // 31 Dec 2015

console.log(+date); // the number of milliseconds, same as date.getTime

// The method Date.parse(str) can read a date from a string.
//     The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms);


//Json
let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};

let json = JSON.stringify(student);
// let value = JSON.parse(str, [reviver]);

user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

console.log(user.friends[1]); // 1

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function (key, value) {
    if (key === 'date') return new Date(value);
    return value;
});

console.log(meetup.date.getDate());

//task to json
user = {
    name: "John Smith",
    age: 35
};

let secondUser = JSON.parse(JSON.stringify(user));
console.log(secondUser);
//end task


//task
room = {
    number: 23
};

meetup = {
    title: "Conference",
    occupiedBy: [{name: "John"}, {name: "Alice"}],
    place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

console.log(JSON.stringify(meetup, function replacer(key, value) {
    return (key !== "" && value === meetup) ? undefined : value;
}));

//endTask